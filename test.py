import requests

# Настройки сервера
BASE_URL = "http://10.131.56.157:8999"
UPLOAD_ENDPOINT = f"{BASE_URL}/upload-file/"
LIST_FILES_ENDPOINT = f"{BASE_URL}/files/"
file_name = "README.md"
print(f"URL: {UPLOAD_ENDPOINT}")

# Функция для загрузки файла
def upload_file(file_name):
    try:
        with open(file_name, 'rb') as file:
            files = {'file': (file_name, file)}
            response = requests.post(UPLOAD_ENDPOINT, files=files)
            if response.status_code == 200:
                print("Файл успешно загружен.", response.content)
            else:
                print(f"Ошибка при загрузке файла: {response.status_code}")
                print(response.text.encode('utf8'))
    except FileNotFoundError:
        print(f"Файл {file_name} не найден.")

# Функция для получения списка файлов
def list_files():
    try:
        response = requests.get(LIST_FILES_ENDPOINT)
        if response.status_code == 200:
            print("Список файлов:")
            print(response.json())
        else:
            print(f"Ошибка при получении списка файлов: {response.status_code}")
            print(response.text)
    except requests.RequestException as e:
        print(f"Ошибка при запросе: {e}")

if __name__ == "__main__":
    # Загрузка файла
    upload_file(file_name)

    # Получение списка файлов
    list_files()
