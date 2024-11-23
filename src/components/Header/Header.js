import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
import Modal from "../Modal/Modal";
import { useUser } from "../../context/UserContext"; // Используем контекст

function Header() {
  const { user, logout } = useUser(); // Получаем данные о пользователе и функцию выхода
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSignUpClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="nav-links">
        <a href="/about">About us</a>
        <a href="#contact">Contact us</a>
        <a href="/upload">Upload File</a>
        <a href="#view">View Sends</a>
      </nav>
      <div className="auth-links">
        {user ? (
          <>
            <span className="user-greeting">Hello, {user.name}!</span>
            <button className="logout-btn" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <button className="signup-btn" onClick={handleSignUpClick}>
              Sing in / Sign up 
            </button>
          </>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} />
    </header>
  );
}

export default Header;
