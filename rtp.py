from pathlib import Path
import ultralytics
import cv2

def blur_faces_in_image(image, model, last_blur_coords=None):
    """
    Обрабатывает изображение, применяя блюр к обнаруженным лицам.

    :param image: Входное изображение (numpy array).
    :param model: Загруженная модель YOLO для детекции лиц.
    :param last_blur_coords: Последние координаты объектов для блюра (список координат).
    :return: Изображение с применённым блюром (numpy array), обновлённые координаты объектов.
    """
    results = model.predict(image, show=False, save=False)

    mobs = []
    for r in results:
        for c in r.boxes:
            mobs.append([int(c.xyxy[0][0]), int(c.xyxy[0][1]), int(c.xyxy[0][2]), int(c.xyxy[0][3])])

    if mobs:
        # Обновляем последние координаты и применяем блюр к обнаруженным объектам
        last_blur_coords = mobs
        for det in mobs:
            x1, y1, x2, y2 = det
            roi = image[y1:y2, x1:x2]
            blurred_roi = cv2.GaussianBlur(roi, (51, 51), 30)
            image[y1:y2, x1:x2] = blurred_roi
    elif last_blur_coords:
        # Применяем блюр к последним известным координатам
        for det in last_blur_coords:
            x1, y1, x2, y2 = det
            roi = image[y1:y2, x1:x2]
            blurred_roi = cv2.GaussianBlur(roi, (51, 51), 30)
            image[y1:y2, x1:x2] = blurred_roi

    return image, last_blur_coords

# Загрузка модели через PyTorch
model_path = "yolov11m-face.pt"  # Убедитесь, что модель доступна
if not Path(model_path).is_file():
    raise FileNotFoundError(f"Модель {model_path} не найдена.")

model = ultralytics.YOLO(model_path)

# Пример использования с видео
video_path = "v4.mp4"
if not Path(video_path).is_file():
    raise FileNotFoundError(f"Видео {video_path} не найдено.")

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Не удалось открыть видеофайл")
    exit()

# Настройка для сохранения видео
output_path = "outputv4.mp4"
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

last_blur_coords = []

while True:
    ret, frame = cap.read()
    if not ret:
        print("Конец видео или ошибка чтения кадра")
        break

    # Обработка кадра через функцию
    frame, last_blur_coords = blur_faces_in_image(frame, model, last_blur_coords)

    # Запись обработанного кадра в выходное видео
    out.write(frame)

# Освобождение ресурсов
cap.release()
out.release()
cv2.destroyAllWindows()

print(f"Обработанное видео сохранено в {output_path}")
