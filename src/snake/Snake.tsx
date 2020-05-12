import React from "react";
import { RouteComponentProps } from "@reach/router";
import "./Snake.css";
import { SnakeGame } from "./SnakeGame";

const highScoreKey = "snakehighscore";

export const Snake = (props: RouteComponentProps) => {
  const [elapsedSeconds, setElapsedSeconds] = React.useState<number>(0);
  const [score, setScore] = React.useState<number>(0);
  const [highScore, setHighScore] = React.useState<number>(
    () => +(localStorage.getItem(highScoreKey) ?? "0")
  );
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [snakeGame, setSnakeGame] = React.useState<SnakeGame | undefined>();

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const startGame = () => {
    const context = canvasRef?.current?.getContext("2d");
    if (!context) {
      return;
    }

    setScore(0);
    setElapsedSeconds(0);
    setIsRunning(true);
    setIsPaused(false);

    var s = snakeGame ?? new SnakeGame(context, 10, 100, update);
    setSnakeGame(s);
    s.start();
  };

  const update = (
    score: number,
    elapsedSeconds: number,
    isRunning: boolean
  ) => {
    setScore(score);
    if (score > highScore) {
      localStorage.setItem(highScoreKey, score.toString());
      setHighScore(score);
    }
    setElapsedSeconds(elapsedSeconds);
    if (!isRunning) {
      stopGame();
    }
  };

  const stopGame = () => {
    snakeGame?.stop();
    setIsPaused(false);
    setIsRunning(false);
  };

  const togglePause = () => {
    snakeGame?.pause();
    setIsPaused(!isPaused);
  };

  const setLastKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    snakeGame?.setLastKey(event.key);
  };

  return (
    <div className="Snake" onKeyUp={setLastKey} tabIndex={-1}>
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
          {isRunning ? (
            <div>
              <button onClick={togglePause} className="Snake-button">
                {isPaused ? "Unpause" : "Pause"}
              </button>
            </div>
          ) : (
            <div>
              <button onClick={startGame} className="Snake-button">
                Start
              </button>
            </div>
          )}
          <div>
            <button onClick={stopGame} className="Snake-button">
              Stop
            </button>
          </div>
          <p>Time: {elapsedSeconds.toFixed()}</p>
          <p>Score: {score}</p>
          <p>High Score: {highScore}</p>
        </div>
        <footer className="Snake-footer">
          <p>This is the snake game!</p>
        </footer>
      </div>
    </div>
  );
};
