import React, { useState } from "react";
import Header from "../../components/Header/Header"; // Ваш компонент Header
import "./Upload.css";

function Upload() {
  const [blurType, setBlurType] = useState(""); // Тип блюра
  const [selectedObject, setSelectedObject] = useState(""); // Выбранная область
  const [file, setFile] = useState(null); // Загруженный файл
  const [blurLevel, setBlurLevel] = useState(1); // Уровень размытия
  const [fileType, setFileType] = useState(""); // Тип файла: photo или video
  const [processedFileUrl, setProcessedFileUrl] = useState(""); // URL обработанного файла
  const [processedFileName, setProcessedFileName] = useState(""); // Имя обработанного файла

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // Определяем тип файла
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "bmp", "gif", "tiff"].includes(fileExtension)) {
      setFileType("photo");
    } else if (["mp4", "avi", "mov", "wmv", "mkv"].includes(fileExtension)) {
      setFileType("video");
    } else {
      setFileType(""); // Неизвестный тип
      alert("Unsupported file type. Please upload an image or video.");
    }
  };

  const handleBlurTypeChange = (type) => {
    setBlurType(type);
  };

  const handleObjectChange = (object) => {
    setSelectedObject(object);
  };

  const handleBlurLevelChange = (level) => {
    setBlurLevel(level);
  };

  // Функция для скачивания обработанного файла
  const handleDownload = async (url, fileName) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName; // Устанавливаем имя скачиваемого файла
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download the file. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    if (!file || !blurType || !selectedObject || !fileType) {
      alert("Please select all options and upload a valid file.");
      return;
    }

    // Увеличиваем уровень размытия
    const adjustedBlurLevel = blurLevel * 50;

    // Создаём FormData для отправки файла и параметров
    const formData = new FormData();
    formData.append("file", file); // Загружаемый файл
    formData.append("type_file", fileType); // Тип файла (photo или video)
    formData.append("name_object", selectedObject); // Выбранный объект
    formData.append("grade_blur", adjustedBlurLevel); // Уровень размытия
    formData.append("blur_filter", blurType); // Тип фильтра (например, Blur или Emoji)
    formData.append("filter", JSON.stringify({ blurType })); // Передаем только blurType

    try {
      // Отправляем данные на сервер
      const response = await fetch("http://192.168.206.53:8999/upload-file/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Предполагается, что сервер возвращает URL обработанного файла
      const { processedFileUrl, fileName } = result;

      setProcessedFileUrl(processedFileUrl);
      setProcessedFileName(fileName || "processed_file.jpg"); // Имя по умолчанию, если сервер не вернул его

      // Сохраняем информацию об отправленном файле в localStorage
      const history = JSON.parse(localStorage.getItem("fileHistory")) || [];
      const fileData = {
        name: file.name,
        date: new Date().toLocaleString(),
        size: `${(file.size / 1024).toFixed(2)} KB`,
        processedFileUrl,
        fileName,
        filter: { blurType },
      };
      localStorage.setItem("fileHistory", JSON.stringify([...history, fileData]));

      alert("Upload successful! You can now download the processed file.");
    } catch (error) {
      console.error("Error:", error);
      alert("Upload failed: " + error.message);
    }
  };

  return (
    <div className="upload-page">
      {/* Включаем ваш хеддер */}
      <Header />
      <div className="upload-container">
        <h3>Upload your file</h3>
        <form className="global-style" onSubmit={handleSubmit}>
          {/* Загрузка файла */}
          <div className="two-column-layout">
            <div className="input-section">
              <h3>Blur settings</h3>
              <div className="content-box">
                <div className="input-box">
                  <label htmlFor="file-upload" className="file-label">
                    <img
                      className="upload-icon"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a259e172b59c359d3dd6683d366a211092ca9414bceeceeeb62ee17c62e547f?placeholderIfAbsent=true&apiKey=cfffc10aaeb749eba6478f6fe4dc030e"
                      alt="Upload icon"
                    />
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                    />
                    <button className="file-text">
                      {file ? file.name : "Choose a file"}
                    </button>
                  </label>
                </div>
              </div>
            </div>

            {/* Blur settings */}
            <div className="settings-section">
              <h3>Blur settings</h3>
              <div className="content-box">
                <div className="blur-settings">
                  <label htmlFor="blur-type">Type of blurring filter:</label>
                  <select
                    id="blur-type"
                    value={blurType}
                    onChange={(e) => handleBlurTypeChange(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      -- Select Blur Type --
                    </option>
                    <option value="blur">Blur</option>
                    <option value="emoji">Emoji</option>
                  </select>

                  <label htmlFor="blur-object">Blurring items:</label>
                  <select
                    id="blur-object"
                    value={selectedObject}
                    onChange={(e) => handleObjectChange(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      -- Select Object --
                    </option>
                    <option value="face">Face</option>
                    <option value="carPlate">Car</option>
                    <option value="object">Other Object</option>
                  </select>

                  <label htmlFor="blur-level">Blur Level:</label>
                  <input
                    id="blur-level"
                    type="range"
                    min="1"
                    max="10"
                    value={blurLevel}
                    onChange={(e) => handleBlurLevelChange(e.target.value)}
                    className="blur-range"
                  />
                </div>
                <div className="submit-btn-section">
                  <button type="submit" className="submit-btn">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Кнопка для скачивания обработанного файла */}
        {processedFileUrl && (
          <div className="download-section">
            <button
              className="download-btn"
              onClick={() => handleDownload(processedFileUrl, processedFileName)}
            >
              Download Processed File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
