import React, { useState } from "react";
import Header from "../../components/Header/Header"; // Ваш компонент Header
import "./Upload.css";

function Upload() {
  const [blurType, setBlurType] = useState(""); // Тип блюра
  const [selectedObject, setSelectedObject] = useState(""); // Выбранная область
  const [file, setFile] = useState(null); // Загруженный файл

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBlurTypeChange = (type) => {
    setBlurType(type);
  };

  const handleObjectChange = (object) => {
    setSelectedObject(object);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !blurType || !selectedObject) {
      alert("Please select all options and upload a file.");
      return;
    }
    alert(`File "${file.name}" uploaded with ${blurType} on ${selectedObject}`);
  };

  return (
    <div className="upload-page">
      {/* Включаем ваш хеддер */}
      <Header />
      <div className="upload-container">
        <h3>Upload your file</h3>
        <form className="global-style" onSubmit={handleSubmit}>
          {/* Загрузка файла */}
          <div className="input-section">
            <div className="input-box">
              <label htmlFor="file-upload" className="file-label">
                <span className="file-icon">&#x2B07;</span>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
                <span className="file-text">
                  {file ? file.name : "Choose a file"}
                </span>
              </label>
            </div>
          </div>

          {/* Blur settings */}
          <div className="settings-section">
            <h3>Blur settings</h3>
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
                <option value="carPlate">Car Plate</option>
                <option value="object">Other Object</option>
              </select>

              <label htmlFor="blur-level">Blur Level:</label>
              <input
                id="blur-level"
                type="range"
                min="1"
                max="10"
                className="blur-range"
              />
            </div>

            <button type="submit" className="submit-btn">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;
