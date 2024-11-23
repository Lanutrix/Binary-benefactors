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
            <p className="skilz">Front-end developer</p>
            <p className="skilz">UX/UI designer</p>
            <pre className="linee"></pre>
            <p className="skilz number">Тел: +7 (919) 899 29-85</p>
            <div class="social-icons">
              <a href="https://vk.com/danandyou"><i class="fab fa-vk"></i></a>
              <a href="https://t.me/Alwaysxdroll"><i class="fab fa-telegram"></i></a>
              <a href="mailto:stringdeity@gmail.com"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
        <div className="cart">
          <img className="img-cart" src={Lavr} alt="Danya" />
          <div className="text-cart">
            <p className="surname surname2">Lavrov Daniil Eduardovich</p>
            <p className="skilz">Main Front-end developer</p>
            <pre className="linee"></pre>
            <p className="skilz number">Тел: +7 (906) 425 35-07</p>
            <div class="social-icons">
              <a href="https://vk.com/tot_malysh"><i class="fab fa-vk"></i></a>
              <a href="https://t.me/lavdadi"><i class="fab fa-telegram"></i></a>
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
            <p className="skilz number">Тел: +7 (918) 552 52-34</p>
            <div class="social-icons">
              <a href="https://vk.com/dmodv"><i class="fab fa-vk"></i></a>
              <a href="https://t.me/Lanutrix"><i class="fab fa-telegram"></i></a>
              <a href="#"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
        
        <div className="cart">
          <img className="img-cart" src={Gredas} alt="Ilya" />
          <div className="text-cart">
            <p className="surname surname4">Gredasov Ilya Grigorievich</p>
            <p className="skilz">ML-engineer</p>
            <pre className="linee"></pre>
            <p className="skilz number">Тел: +7 (919) 892 42-45</p>
            <div class="social-icons">
              <a href="https://vk.com/id807623145"><i class="fab fa-vk"></i></a>
              <a href="https://t.me/wolfram_alpha_com"><i class="fab fa-telegram"></i></a>
              <a href="#"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
