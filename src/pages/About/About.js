// src/pages/About/About.js
import React from "react";
import Header from "../../components/Header/Header";
import "./About.css";
import Yagol from "../../assets/Yagol.png"; // Импорт изображения
import Lavr from "../../assets/Lavr.png"; // Импорт изображения
import Odin from "../../assets/men(2).png"; // Импорт изображения
import Gredas from "../../assets/Gredas.png"; // Импорт изображения

function About() {
  return (
    <div className="about">
      <Header />
      <div className="about-content">
        <h1 className="title-about">Binary Benefators</h1>
      </div>
      <div className="total-flex">
        <div className="cart">
          <img className="img-cart" src={Yagol} alt="Yaga" />
          <div className="text-cart">
            <p className="surname surname1">Yagolnik Daniil Sergeevich</p>
            <p className="skilz">Back-end developer</p>
            <pre className="linee"></pre>
            <p className="skilz number">Тел: +7 (919) 892 42-45</p>
            <div class="social-icons">
              <a href="#"><i class="fab fa-vk"></i></a>
              <a href="#"><i class="fab fa-telegram"></i></a>
              <a href="#"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
        
        <div className="cart">
          <img className="img-cart" src={Lavr} alt="Danya" />
          <div className="text-cart">
            <p className="surname surname2">Odintsov Dmitry Maksimovich</p>
            <p className="skilz">Back-end developer</p>
            <pre className="linee"></pre>
            <p className="skilz number">Тел: +7 (919) 892 42-45</p>
            <div class="social-icons">
              <a href="#"><i class="fab fa-vk"></i></a>
              <a href="#"><i class="fab fa-telegram"></i></a>
              <a href="#"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
      </div>

      <div className="total-flex">
        <div className="cart">
          <img className="img-cart" src={Odin} alt="Dima" />
          <div className="text-cart">
            <p className="surname surname3">Odintsov Dmitry Maksimovich</p>
            <p className="skilz">Back-end developer</p>
            <pre className="linee"></pre>
            <p className="skilz number">Тел: +7 (919) 892 42-45</p>
            <div class="social-icons">
              <a href="#"><i class="fab fa-vk"></i></a>
              <a href="#"><i class="fab fa-telegram"></i></a>
              <a href="#"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
        
        <div className="cart">
          <img className="img-cart" src={Gredas} alt="Ilya" />
          <div className="text-cart">
            <p className="surname surname4">Odintsov Dmitry Maksimovich</p>
            <p className="skilz">Back-end developer</p>
            <pre className="linee"></pre>
            <p className="skilz number">Тел: +7 (919) 892 42-45</p>
            <div class="social-icons">
              <a href="#"><i class="fab fa-vk"></i></a>
              <a href="#"><i class="fab fa-telegram"></i></a>
              <a href="#"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
