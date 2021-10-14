import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import "./ProgressBar.css";

type OwnProps = {
  start: boolean;
  restart: boolean;
  finish: boolean;
  getTimeRelease: Function;
  endGame: Function;
};

const ProgressBar: FunctionComponent<OwnProps> = ({
  start,
  restart,
  finish,
  getTimeRelease,
  endGame,
}) => {
  const [time, setTime] = useState<string>("");
  const progressBarContent = useRef<any>(null);
  const intervalRef = useRef<any>();
  const gameOverIntervalRef = useRef<any>();

  useEffect(() => {
    progressBarContent.current.classList.add("paused");
    progressBarContent.current.classList.remove("restart");
    if (start) {
      let dec = 0;
      let sec = 0;
      let min = 0;
      progressBarContent.current.classList.remove("paused");
      progressBarContent.current.classList.add("in-progress");

      const intervalTimer = setInterval(() => {
        dec += 1;
        if (dec >= 10) {
          dec = 0;
          sec += 1;
        }
        if (sec >= 60) {
          sec = 0;
          min += 1;
        }
        setTime(`${min} : ${sec} : ${dec}`);
      }, 100);
      intervalRef.current = intervalTimer;

      const intervalGameOver = setTimeout(() => {
        clearInterval(intervalRef.current);
        endGame();
      }, 60000);
      gameOverIntervalRef.current = intervalGameOver;
    }
  }, [start]);

  useEffect(() => {
    async function timeRelease() {
      await getTimeRelease(time);
    }
    timeRelease();
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(gameOverIntervalRef.current);
      progressBarContent.current.classList.add("paused");
    };
  }, [finish]);

  useEffect(() => {
    if (restart) {
      progressBarContent.current.classList.add("restart");
      progressBarContent.current.classList.remove("in-progress");
    }
  }, [restart]);

  return (
    <div>
      <div className="container-progress-bar">
        <div
          ref={progressBarContent}
          className="progress-bar-content in-progress"
        ></div>
      </div>
      <div>{time}</div>
    </div>
  );
};

export default ProgressBar;
