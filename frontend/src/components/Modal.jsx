import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

const Modal = ({ show, closeModal, children }) => {
  const navigate = useNavigate();
  if (!show) return null;
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="overlay" onClick={closeModal}></div>
      {children}
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
