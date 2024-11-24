// src/pages/History/History.js
import React from "react";
import Header from "../../components/Header/Header";
import "./History.css";

function History() {
  return (
    <div className="history-page">
      {/* Включаем ваш хеддер */}
      <Header />
      <div className="history-container">
        <h3>Your sends</h3>
        <pre className="linee"></pre>
        <div className="history-list">
            <div className="colums">
                <span>Name</span>
                <span>Bluring level</span>
                <span>Status</span>
                <span>Date</span>
                <span>Size</span>
                <span></span>
            </div>
            <div className="file-history">

            </div>
        </div>
      </div>
    </div>
  );  
}


export default History;