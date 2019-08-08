import React from "react";

const Button = ({ onHandleClick, isButtonDisabled }) => {
  return (
    <button
      onClick={onHandleClick}
      style={{ display: isButtonDisabled ? "none" : "" }}
    >
      Start
    </button>
  );
};

export default Button;
