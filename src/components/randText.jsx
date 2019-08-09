import React, { Component } from "react";
import "./styles.css";

class RandText extends Component {
  render() {
    const { renderGreen, renderBlack, renderRed } = this.props;
    const renderBlackStr = renderBlack.join("");
    const renderGreenStr = renderGreen.join("");
    const renderRedstr = renderRed.join("");
    return (
      <div>
        <span className="text" style={{ color: "#98FB98" }}>
          {renderGreenStr}
        </span>
        <span className="text" style={{ backgroundColor: "red" }}>
          {renderRedstr}
        </span>
        <span className="text">{renderBlackStr}</span>
      </div>
    );
  }
}

export default RandText;
