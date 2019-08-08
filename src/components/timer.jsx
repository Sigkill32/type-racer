import React from "react";

const Timer = ({ time, isGameOver }) => {
  return (
    //   <h3>
    //     Total Time Taken: {time.min} min:{time.sec} sec
    //   </h3>
    // ) : (
    //   <h3>
    //     Time Elapsed: {time.min} min: {time.sec} sec
    //   </h3>

    <div className="timer">
      <span>
        {time.min < 10 ? `0${time.min}` : time.min}{" "}
        <span style={{ fontSize: "15px" }}>M :&nbsp; </span>
      </span>
      <span>
        {time.sec < 10 ? `0${time.sec}` : time.sec}{" "}
        <span style={{ fontSize: "15px" }}>S</span>
      </span>
    </div>
  );
};

export default Timer;
