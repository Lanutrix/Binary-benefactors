import React, { useState } from "react";
import "./SignInModal.css";
import bustImage from "../../assets/bust.png";
import { useUser } from "../../context/UserContext"; // Используем контекст

function SignInModal({ isOpen, onClose }) {
  const { login } = useUser(); // Получаем функцию для входа
  const [username, setUsername] = useState(""); // Имя пользователя
  const [password, setPassword] = useState(""); // Пароль

  const handleSignIn = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      login(username); // Сохраняем имя пользователя
      onClose(); // Закрываем модальное окно
    } else {
      alert("Please fill in all fields");
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
          {/* Левая часть */}
          <div className="modal-left">
            <h2>Sign In</h2>
            <p>Please enter your credentials</p>
            <form className="signin-form" onSubmit={handleSignIn}>
              <input
                type="text"
                placeholder="Your Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="signin-btn">
                Sign In
              </button>
            </form>
          </div>
          {/* Правая часть */}
          <div className="modal-right">
            <img src={bustImage} alt="Bust" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
