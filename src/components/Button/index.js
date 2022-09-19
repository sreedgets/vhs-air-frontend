import React from "react";
//styles
import "./styles.scss";

const Button = ({ text, onClick }) => {
  return (
    <div className="button" onClick={onClick}>
      <div className="button__text">{text}</div>
    </div>
  );
};

export default Button;
