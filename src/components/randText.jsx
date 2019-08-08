import React, { Component } from "react";
import "./styles.css";

class RandText extends Component {
  render() {
    const { splitA, splitB, splitC } = this.props;
    const splitBStr = splitB.join("");
    const splitAStr = splitA.join("");
    const splitCstr = splitC.join("");
    return (
      <div>
        <span className="text" style={{ color: "#98FB98" }}>
          {splitAStr}
        </span>
        <span className="text" style={{ backgroundColor: "red" }}>
          {splitCstr}
        </span>
        <span className="text">{splitBStr}</span>
      </div>
    );
  }
}

export default RandText;
