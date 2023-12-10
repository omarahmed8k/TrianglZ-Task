import React from "react";
import "./ErrorMessage.scss";

export default function ErrorMessage({ message }) {
  return (
    <div className="err-message-container">
      <div className="err-message">
        <i className="fa-solid fa-circle-xmark"></i>
        <h4 className="err-text">{message}</h4>
      </div>
    </div>
  );
}
