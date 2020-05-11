import React from "react";
import { RouteComponentProps } from "@reach/router";
import "./Snake.css";
import { SnakeGame } from "./SnakeGame";

export const Snake = (props: RouteComponentProps) => {
  const [timer, setTimer] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [snakeGame, setSnakeGame] = React.useState<SnakeGame | undefined>();

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const startGame = () => {
    const canvas = canvasRef.current;
    const canvasContext = canvas?.getContext("2d");
    if (canvasContext) {
      var s = new SnakeGame(
        canvasContext,
        (score) => setScore(score),
        (timer) => setTimer(timer)
      );
      setSnakeGame(s);
      s.start();
    }
  };

  const stopGame = () => {
    snakeGame?.stop();
  };

  return (
    <div className="Snake">
      <div className="Snake-grid">
        <header className="Snake-header">
          <h3>Snake Game</h3>
        </header>
        <div className="Snake-main">
          <canvas
            height={400}
            width={600}
            ref={canvasRef}
            className="Snake-canvas"
          ></canvas>
        </div>
        <div className="Snake-info">
          <button onClick={startGame} className="Snake-button">
            Start
          </button>
          <button onClick={stopGame} className="Snake-button">
            Stop
          </button>
          <p>Time: {timer}</p>
          <p>Score: {score}</p>
          <p>High Score: 0</p>
        </div>
        <footer className="Snake-footer">
          <p>This is the snake game!</p>
        </footer>
      </div>
    </div>
  );
};
