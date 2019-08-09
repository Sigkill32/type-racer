import React from "react";

const getTime = time => {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  return { min, sec };
};

const Timer = ({ time }) => {
  const timeObj = getTime(time);
  return (
    <div className="timer">
      <span>
        {timeObj.min < 10 ? `0${timeObj.min}` : timeObj.min}&nbsp;
        <span style={{ fontSize: "15px" }}>M :&nbsp; </span>
      </span>
      <span>
        {timeObj.sec < 10 ? `0${timeObj.sec}` : timeObj.sec}&nbsp;
        <span style={{ fontSize: "15px" }}>S</span>
      </span>
    </div>
  );
};

export default Timer;
