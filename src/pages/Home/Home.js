import React from "react";
import Header from "../../components/Header/Header";
import "./Home.css";
import womanImage from "../../assets/woman-mask.png"; // Импорт изображения
import { useUser } from "../../context/UserContext"; // Импортируем контекст

function Home() {
  const { user } = useUser(); // Получаем данные о текущем пользователе

  return (
    <div className="home">
      <Header />
      <div className="main-content">
        <div className="text-content">
          {/* Отображение имени пользователя, если зарегистрирован */}
          <h1 className="text-title">
            Welcome {user ? user.name : "Guest"} to FACE OFF
          </h1>
          <h1>from your photo/video</h1>
          <p className="text">
            Do you want to add a touch of anonymity or just hide something that
            others don’t need to see?<br/><br/> Try our service, which will help you with
            this!
          </p>
          <button className="try-btn">
            <span className="icon">
              <img src={require("../../assets/face-icon.png")} alt="Face Icon" />
            </span>
            Trying
          </button>
        </div>
        <div className="image-content">
          <img src={womanImage} alt="Woman in mask" />
        </div>
      </div>
    </div>
  );
}

export default Home;
