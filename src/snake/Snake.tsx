import React from "react";
import { RouteComponentProps } from "@reach/router";
import { css } from "aphrodite";
import { SnakeGame } from "./SnakeGame";
import { styles } from "./styles";

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
    event.preventDefault();
  };

  return (
    <div className={css(styles.container)} onKeyUp={setLastKey} tabIndex={-1}>
      <div className={css(styles.grid)}>
        <header className={css(styles.header)}>
          <h3>Space Snake Game</h3>
        </header>
        <div className={css(styles.main)}>
          <canvas
            height={400}
            width={600}
            ref={canvasRef}
            className={css(styles.gameCanvas)}
          ></canvas>
        </div>
        <div className={css(styles.info)}>
          {isRunning ? (
            <div>
              <button onClick={togglePause} className={css(styles.button)}>
                {isPaused ? "Unpause" : "Pause"}
              </button>
            </div>
          ) : (
            <div>
              <button onClick={startGame} className={css(styles.button)}>
                Start
              </button>
            </div>
          )}
          <div>
            <button onClick={stopGame} className={css(styles.button)}>
              Stop
            </button>
          </div>
          <p>Time: {elapsedSeconds.toFixed()}</p>
          <p>Score: {score}</p>
          <p>High Score: {highScore}</p>
        </div>
        <footer className={css(styles.footer)}>
          <p>Control the space snake to eat the space fruit!</p>
        </footer>
      </div>
    </div>
  );
};
