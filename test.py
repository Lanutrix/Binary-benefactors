import unittest
import requests

class TestUploadFileEndpoint(unittest.TestCase):

    BASE_URL = "http://192.168.43.53:8999/upload-file/"  # Замените на ваш хост и порт

    def test_upload_photo(self):
        # Открываем файл для теста
        with open("face.jpg", "rb") as file:
            # Формируем данные для запроса
            files = {"file": file}
            data = {
                "type_file": "photo",
                "name_object": "face",
                "grade_blur": "20"
            }
            
            # Отправляем POST-запрос
            response = requests.post(self.BASE_URL, files=files, data=data)
            
            # Проверяем статус код и ответ
            self.assertEqual(response.status_code, 200)
            self.assertIn("File uploaded successfully", response.json().get("message"))

    def test_upload_video(self):
        # Открываем файл для теста
        with open("v2.mp4", "rb") as file:
            # Формируем данные для запроса
            files = {"file": file}
            data = {
                "type_file": "video",
                "name_object": "face",
                "grade_blur": "50"
            }
            
            # Отправляем POST-запрос
            response = requests.post(self.BASE_URL, files=files, data=data)
            
            # Проверяем статус код и ответ
            self.assertEqual(response.status_code, 200)
            self.assertIn("File uploaded successfully", response.json().get("message"))

if __name__ == "__main__":
    unittest.main()