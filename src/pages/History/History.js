import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./History.css";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fileHistory = JSON.parse(localStorage.getItem("fileHistory")) || [];
    setHistory(fileHistory);
  }, []);

  // Функция для скачивания обработанного файла
  const handleDownload = async (url, fileName) => {
    try {
      // Проверяем доступность файла по URL
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      // Создаём blob для скачивания
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Создаём временную ссылку для скачивания
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName; // Указываем имя файла
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Освобождаем память
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download the file. Please try again later.");
    }
  };

  return (
    <div className="history-page">
      {/* Включаем ваш хеддер */}
      <Header />
      <div className="history-container">
        <h3>Your sends</h3>
        <pre className="linee"></pre>
        <div className="history-list">
          <div className="colums">
            <span className="name-int">Name</span>
            <span className="data-int">Date</span>
            <span className="size-int">Size</span>
          </div>
          <div className="file-history">
            {history.map((file, index) => (
              <div className="history-item" key={index}>
                <span>{file.name}</span>
                <span>{file.date}</span>
                <span>{file.size}</span>
                <span>
                  <button
                    onClick={() => handleDownload(file.processedFileUrl, file.name)}
                    className="download-btn"
                  >
                    Download
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
