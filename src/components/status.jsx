import React from "react";

const Status = ({ gameStatus, isGameOver }) =>
  isGameOver ? (
    <React.Fragment>
      <span style={{ fontSize: "30px", color: "red" }}>
        {isGameOver ? "Game Over" : ""}
      </span>
      <br />
      <br />
      <span style={{ fontSize: "25px" }}>
        {gameStatus.wpmStr}
        <span className="fb">{gameStatus.wpm} &nbsp;&nbsp;&nbsp;</span>
        {gameStatus.timeTakenStr}
        <span className="fb">
          {gameStatus.totalTime.value} {gameStatus.totalTime.unit}
        </span>
      </span>
    </React.Fragment>
  ) : (
    <span style={{ fontSize: "30px" }}>{gameStatus.currentStatus}</span>
  );

export default Status;
