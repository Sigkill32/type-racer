import React from "react";

const Status = ({ gameStatus, semiStatus, isGameOver }) => {
  return isGameOver ? (
    <React.Fragment>
      <span style={{ fontSize: "30px", color: "red" }}>{semiStatus}</span>
      <br />
      <br />
      <span style={{ fontSize: "25px" }}>
        {gameStatus.wpmStr}
        <span style={{ fontSize: "25px", fontWeight: "bold" }}>
          {gameStatus.wpm} &nbsp;
        </span>
        {gameStatus.timeTakenStr}
        <span style={{ fontSize: "25px", fontWeight: "bold" }}>
          {gameStatus.totalTime.value} {gameStatus.totalTime.unit}
        </span>
      </span>
    </React.Fragment>
  ) : (
    <span style={{ fontSize: "30px" }}>{gameStatus}</span>
  );
};

export default Status;
