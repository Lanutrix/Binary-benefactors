from flask import Flask, request, jsonify
import os
import gen

app = Flask(__name__)

# Папка для сохранения загруженных файлов
UPLOAD_FOLDER = "uploaded_files"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.chdir("static")


@app.route("/upload-file/", methods=["POST"])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({"message": "No file part"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"message": "No selected file"}), 400

        # Путь для сохранения файла
        file_path = gen.generate_id(10)+"_"+file.filename

        # Сохранение файла
        file.save(file_path)

        return jsonify({"message": "File uploaded successfully", "filename": file.filename}), 200
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@app.route("/files/", methods=["GET"])
def list_files():
    try:
        # Список файлов в папке
        files = os.listdir()
        return jsonify({"files": files}), 200
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8999)