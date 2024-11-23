from flask import Flask, request, jsonify, send_from_directory
import os
import subprocess
from json import loads, dumps
from flask_cors import CORS
from collections import deque
import time
import gen
from multiprocessing import Process


dp = []

app = Flask(__name__, static_folder="static")  # Указываем папку для статических файлов
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

ip_queue = {}

max_requests = 120
interval = 60

def is_allowed(ip):
    if ip not in ip_queue:
        ip_queue[ip] = deque([time.time()], maxlen=max_requests)
    else:
        ip_queue[ip].append(time.time())
        if (
            len(ip_queue[ip]) == max_requests
            and ip_queue[ip][-1] - ip_queue[ip][0] < interval
        ):
            return False
    return True

@app.before_request
def limit_requests():
    if not is_allowed(request.remote_addr):
        return (
            jsonify({"error": "Too many requests"}),
            429,
            {"Content-Type": "application/json"},
        )

def blur_video(type_file: str, name_object: str, grade_blur: int, path: str, output_path: str) -> bool:
    try:
        jj = f'.\\XACK.exe {type_file} {name_object} {grade_blur} {path} {output_path}'
        os.system(jj)
        return True
    except Exception as e:
        print(f"Error in blur_video_async: {str(e)}")
        return False


def start_blur_video(type_file: str, name_object: str, grade_blur: int, path: str, output_path: str):
    Process(target=blur_video, args=(type_file, name_object, grade_blur, path, output_path,), daemon=True).start()
    return True


@app.route("/upload-file/", methods=["POST"])
def upload_file():
    global dp
    try:
        if 'file' not in request.files:
            return jsonify({"message": "No file part"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"message": "No selected file"}), 400

        type_file = request.form.get('type_file')
        name_object = request.form.get('name_object')
        grade_blur = request.form.get('grade_blur')

        if not type_file or not name_object or not grade_blur:
            return jsonify({"message": "Missing required parameters"}), 400

        try:
            grade_blur = int(grade_blur)
        except ValueError:
            return jsonify({"message": "grade_blur must be an integer"}), 400

        file_id = gen.generate_id(10)
        file_path = f"{file_id}_{file.filename}"
        output_path = f"output_{file_id}_{file.filename}"
        os.chdir('static')
        file.save(file_path)

        # time.sleep(0.1)
        f =  start_blur_video(type_file, name_object, grade_blur, file_path, output_path)
        os.chdir('..')
        if f:
            dp.append(output_path)
            return jsonify({
                "message": "File uploaded successfully",
                "filename": output_path,
            }), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@app.route("/files/", methods=["GET"])
def list_files():
    global dp
    try:
        files = dp
        return jsonify({"files": files}), 200
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@app.route("/<path:filename>")
def serve_static_files(filename):
    return send_from_directory(app.static_folder, filename)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8999, debug=True)
