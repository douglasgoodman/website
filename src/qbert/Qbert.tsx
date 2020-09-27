import React, { useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { css } from "aphrodite";
import { styles } from "./styles";
import { CanvasHeight, CanvasWidth } from "./constants";
import { QbertGame } from "./QbertGame";
import { useKeydown, useKeydownMultiple } from "../hooks";
import { Direction } from "./enums";

export const Qbert = (props: RouteComponentProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [game, setGame] = React.useState<QbertGame>();
  const [isStarted, setIsStarted] = React.useState(false);
  const [isGameOver, setIsGameOver] = React.useState(false);

  const startGame = React.useCallback(() => {
    if (isStarted || !game) {
      return;
    }

    if (isGameOver) {
      var canvas = canvasRef?.current?.getContext("2d");
      if (canvas) {
        const g = new QbertGame(canvas, onGameOver);
        setGame(g);
        g.start();
        setIsGameOver(false);
        setIsStarted(true);
      }
    } else {
      game.start();
      setIsStarted(true);
    }
  }, [isStarted, game, isGameOver]);

  const moveUpLeft = React.useCallback(() => {
    if (!isStarted) {
      return;
    }

    game?.move(Direction.UpLeft);
  }, [isStarted, game]);

  const moveUpRight = React.useCallback(() => {
    if (!isStarted) {
      return;
    }

    game?.move(Direction.UpRight);
  }, [isStarted, game]);

  const moveDownLeft = React.useCallback(() => {
    if (!isStarted) {
      return;
    }

    game?.move(Direction.DownLeft);
  }, [isStarted, game]);

  const moveDownRight = React.useCallback(() => {
    if (!isStarted) {
      return;
    }

    game?.move(Direction.DownRight);
  }, [isStarted, game]);

  useKeydown(" ", startGame);
  useKeydownMultiple("ArrowUp", "ArrowLeft", moveUpLeft);
  useKeydownMultiple("ArrowUp", "ArrowRight", moveUpRight);
  useKeydownMultiple("ArrowDown", "ArrowLeft", moveDownLeft);
  useKeydownMultiple("ArrowDown", "ArrowRight", moveDownRight);

  const onGameOver = () => {
    setIsStarted(false);
    setIsGameOver(true);
  };

  useEffect(() => {
    const context = canvasRef?.current?.getContext("2d");
    if (!context) {
      return;
    }
    setGame(new QbertGame(context, onGameOver));
  }, [canvasRef]);

  return (
    <div>
      <div className={css(styles.content)}>
        <div className={css(styles.title)}>Q*bert</div>
        <div>
          <canvas
            height={CanvasHeight}
            width={CanvasWidth}
            ref={canvasRef}
            className={css(styles.gameCanvas)}
          />
        </div>
      </div>
    </div>
  );
};
