import React from "react";

const Input = ({
  onHandleChange,
  onHandleKeyDown,
  text,
  isInputDisabled,
  onRef
}) => (
  <input
    placeholder="Type here to start racing"
    onChange={onHandleChange}
    onKeyDown={onHandleKeyDown}
    disabled={isInputDisabled ? "disabled" : ""}
    className={isInputDisabled ? "field cursor-disallowed" : "field"}
    value={text}
    ref={onRef}
  />
);

export default Input;
