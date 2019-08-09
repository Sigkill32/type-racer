import React from "react";

const Button = ({ onHandleClick, isButtonDisabled }) => (
  <button
    onClick={onHandleClick}
    className={isButtonDisabled ? "btn-hide" : ""}
  >
    Start
  </button>
);

export default Button;
