import React, { Component } from "react";

class Input extends Component {
  render() {
    const {
      onHandleChange,
      onHandleKeyDown,
      text,
      isInputDisabled,
      onRef
    } = this.props;
    return (
      <input
        placeholder="Type here to start racing"
        className="field"
        onChange={onHandleChange}
        onKeyDown={onHandleKeyDown}
        disabled={isInputDisabled ? "disabled" : ""}
        style={{ cursor: isInputDisabled ? "not-allowed" : "" }}
        value={text}
        ref={onRef}
      />
    );
  }
}

export default Input;
