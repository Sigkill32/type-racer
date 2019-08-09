import React, { Component } from "react";
import "./styles.css";

class RandText extends Component {
  render() {
    const { renderCorrect, untouched, renderWrong } = this.props;
    const untouchedStr = untouched.join("");
    const renderCorrectStr = renderCorrect.join("");
    const renderWrongstr = renderWrong.join("");
    return (
      <div>
        <span className="text" style={{ color: "#98FB98" }}>
          {renderCorrectStr}
        </span>
        <span className="text" style={{ backgroundColor: "red" }}>
          {renderWrongstr}
        </span>
        <span className="text">{untouchedStr}</span>
      </div>
    );
  }
}

export default RandText;
