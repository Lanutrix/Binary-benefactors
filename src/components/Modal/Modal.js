import React, { useState } from "react";
import "./Modal.css";
import bustImage from "../../assets/bust2.png";
import { useUser } from "../../context/UserContext"; // Контекст пользователя

function Modal({ isOpen, onClose }) {
  const { login } = useUser(); // Функция для "входа" пользователя
  const [username, setUsername] = useState(""); // Имя пользователя
  const [email, setEmail] = useState(""); // Email
  const [password, setPassword] = useState(""); // Пароль

  const handleRegister = (e) => {
    e.preventDefault();
    if (username.trim() && email.trim() && password.trim()) {
      login(username); // Сохраняем имя пользователя через контекст
      onClose(); // Закрываем модальное окно
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
          {/* Левая часть окна */}
          <div className="modal-left">
            <h2 className="text-title-modal">Sing in / Sign up</h2>
            <p>Please enter your details</p>
            <form className="registration-form" onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Your Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a href="#forgot-password" className="forgot-password-link">
                Forgot password?
              </a>
              <button type="submit" className="register-btn">
                Enter
              </button>
            </form>
          </div>

          {/* Правая часть окна */}
          <div className="modal-right">
            <img className="img-bust" src={bustImage} alt="Bust" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
