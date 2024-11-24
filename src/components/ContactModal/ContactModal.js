import React, { useState } from "react";
import "./ContactModal.css";

function ContactModal({ isOpen, onClose }) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          <div className="modal-content">
            <div className="modal-left">

            </div>
            <div className="modal-right">

            </div>
          </div>
        </div>
      </div>
    );
}