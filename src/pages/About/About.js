// src/pages/About/About.js
import React from "react";
import Header from "../../components/Header/Header";
import "./About.css";
import Yagol from "../../assets/men(4).png"; // Импорт изображения
import Lavr from "../../assets/men(3).png"; // Импорт изображения
import Odin from "../../assets/men(2).png"; // Импорт изображения
import Greedas from "../../assets/men(1).png"; // Импорт изображения

function About() {
  return (
    <div className="about">
      <Header />
      <div className="about-content">
        <h1 className="title-about">Binary Benefators</h1>
      </div>
      <div className="total-flex">
        <div className="cart">
          <img className="img-cart" src={Odin} alt="Dima" />
          <div className="text-cart">
            <p className="surname surnameO">Odintsov Dmitry Maksimovich</p>
            <p className="skilz">Back-end developer</p>
            <pre className="linee">____________________________</pre>
            <p className="skilz">Тел: +7 (919) 892 42-45</p>
            <a href="#"><i className="fab fa-vk"></i></a>
            <a href="#"><i className="fab fa-telegram"></i></a>
            <a href="#"><i className="fas fa-envelope"></i></a>
          </div>
        </div>
        
        <div className="cart">
          <img className="img-cart" src={Odin} alt="Dima" />
          <div className="text-cart">
            <p className="surname surnameO">Odintsov Dmitry Maksimovich</p>
            <p className="skilz">Back-end developer</p>
            <pre className="linee">____________________________</pre>
            <p className="skilz">Тел: +7 (919) 892 42-45</p>
            <a href="#"><i className="fab fa-vk"></i></a>
            <a href="#"><i className="fab fa-telegram"></i></a>
            <a href="#"><i className="fas fa-envelope"></i></a>
          </div>
        </div>
      </div>

      <div className="total-flex">
        <div className="cart">
          <img className="img-cart" src={Odin} alt="Dima" />
          <div className="text-cart">
            <p className="surname surnameO">Odintsov Dmitry Maksimovich</p>
            <p className="skilz">Back-end developer</p>
            <pre className="linee">____________________________</pre>
            <p className="skilz">Тел: +7 (919) 892 42-45</p>
            <a href="#"><i className="fab fa-vk"></i></a>
            <a href="#"><i className="fab fa-telegram"></i></a>
            <a href="#"><i className="fas fa-envelope"></i></a>
          </div>
        </div>
        
        <div className="cart">
          <img className="img-cart" src={Odin} alt="Dima" />
          <div className="text-cart">
            <p className="surname surnameO">Odintsov Dmitry Maksimovich</p>
            <p className="skilz">Back-end developer</p>
            <pre className="linee">____________________________</pre>
            <p className="skilz">Тел: +7 (919) 892 42-45</p>
            <a href="#"><i className="fab fa-vk"></i></a>
            <a href="#"><i className="fab fa-telegram"></i></a>
            <a href="#"><i className="fas fa-envelope"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
