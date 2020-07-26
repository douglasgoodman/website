import * as React from "react";
import { Field } from "./Field";
import { Piece, PieceProps, PieceSize, Block } from "./pieces";
import { Stage } from "react-konva";
import {
  StageWidth,
  StageHeight,
  FieldWidthBlocks,
  FieldHeightBlocks,
} from "./constants";
import { Outline } from "./Outline";
import { Next } from "./Next";
import { Scoreboard } from "./Scoreboard";
import { Tetromino } from "./pieces";
import { PieceStates, PieceColors } from "./pieces/types";
import { useInterval } from "./useInterval";

function generateEmptyField(): number[][] {
  const field: number[][] = [];
  const fieldWidth = FieldWidthBlocks + 2;
  const fieldHeight = FieldHeightBlocks + 2;

  for (let row = 0; row < fieldHeight; row++) {
    field[row] = [];
    for (let col = 0; col < fieldWidth; col++) {
      if (
        row === 0 ||
        row > FieldHeightBlocks ||
        col === 0 ||
        col > FieldWidthBlocks
      ) {
        field[row][col] = 1;
      } else {
        field[row][col] = 0;
      }
    }
  }

  return field;
}

export const Game = () => {
  const [isStarted, setIsStarted] = React.useState(false);
  const [next, setNext] = React.useState(getRandomPiece());
  const [score, setScore] = React.useState(0);
  const [lines, setLines] = React.useState(0);
  const [currentPiece, setCurrentPiece] = React.useState<PieceProps>({
    piece: getRandomPiece(),
    x: 0,
    y: 0,
    rotation: 0,
  });
  const [currentField, setCurrentField] = React.useState<number[][]>([]);
  const [currentLines, setCurrentLines] = React.useState<number[]>([]);
  const [isClearing, setIsClearing] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);

  const isCollision = React.useCallback(
    (props: PieceProps): boolean => {
      const { piece, x, y, rotation } = props;
      const { width, height } = PieceSize[piece];
      const state = PieceStates[piece].states[rotation];

      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          if (state[row][col] && currentField[y + 1 + row][x + 1 + col]) {
            return true;
          }
        }
      }

      return false;
    },
    [currentField]
  );

  const moveLeft = React.useCallback(() => {
    const { x } = currentPiece;

    if (!isCollision({ ...currentPiece, x: x - 1 })) {
      setCurrentPiece({
        ...currentPiece,
        x: x - 1,
      });
    }
  }, [currentPiece, isCollision]);

  const moveRight = React.useCallback(() => {
    const { x } = currentPiece;

    if (!isCollision({ ...currentPiece, x: x + 1 })) {
      setCurrentPiece({
        ...currentPiece,
        x: x + 1,
      });
    }
  }, [currentPiece, isCollision]);

  const moveDown = React.useCallback((): boolean => {
    const { y } = currentPiece;

    if (!isCollision({ ...currentPiece, y: y + 1 })) {
      setCurrentPiece({
        ...currentPiece,
        y: y + 1,
      });
      return true;
    }

    return false;
  }, [currentPiece, isCollision]);

  const rotate = React.useCallback(() => {
    const { rotation } = currentPiece;

    if (!isCollision({ ...currentPiece, rotation: (rotation + 1) % 4 })) {
      setCurrentPiece({
        ...currentPiece,
        rotation: (currentPiece.rotation + 1) % 4,
      });
    }
  }, [currentPiece, isCollision]);

  const setPieceInField = React.useCallback((): number[][] => {
    const { piece, x, y, rotation } = currentPiece;
    const { width, height } = PieceSize[piece];
    const s = PieceStates[piece].states[rotation];
    const { color } = PieceColors[piece];
    const field = currentField.map((s) => s.slice());

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (s[row][col]) {
          field[y + 1 + row][x + 1 + col] = color;
        }
      }
    }

    return field;
  }, [currentField, currentPiece]);

  const checkForLines = React.useCallback((field: number[][]): boolean => {
    const lines = [];

    for (let row = 1; row <= FieldHeightBlocks; row++) {
      if (field[row].every((b) => b > 0)) {
        lines.push(row);
      }
    }

    if (lines.length > 0) {
      setIsClearing(true);
      setCurrentLines(lines);
      return true;
    }

    return false;
  }, []);

  const removeLines = React.useCallback(() => {
    if (currentLines) {
      const field = currentField.map((i) => i.slice());

      for (let row = 1; row <= FieldHeightBlocks; row++) {
        if (currentLines.includes(row)) {
          for (let i = row; i > 1; i--) {
            field[i] = field[i - 1].slice();
          }
        }
      }

      setLines(lines + currentLines.length);
      if (currentLines.length === 4) {
        setScore(score + 800);
      } else {
        setScore(score + currentLines.length * 100);
      }
      setCurrentField(field);
      setCurrentLines([]);
      setIsClearing(false);
    }
  }, [currentLines, currentField, lines, score]);

  const nextPiece = () => {
    const newPiece: PieceProps = {
      piece: next,
      x: Math.floor((FieldWidthBlocks - PieceSize[next].width) / 2),
      y: 0,
      rotation: 0,
    };
    setCurrentPiece(newPiece);
    setNext(getRandomPiece());
    if (isCollision({ ...newPiece })) {
      setGameOver(true);
      setIsStarted(false);
    }
  };

  const tick = () => {
    if (!isStarted) {
      return;
    }

    if (isClearing) {
      removeLines();
      nextPiece();
      return;
    }

    if (!moveDown()) {
      const field = setPieceInField();
      const lines = checkForLines(field);
      setCurrentField(field);
      if (!lines) {
        nextPiece();
      }
    }
  };

  useInterval(tick, 500);

  const startGame = React.useCallback(() => {
    if (isStarted) {
      return;
    }

    setCurrentField(generateEmptyField());
    setCurrentLines([]);
    setScore(0);
    setLines(0);
    const piece = getRandomPiece();
    setCurrentPiece({
      piece: piece,
      x: Math.floor((FieldWidthBlocks - PieceSize[piece].width) / 2),
      y: 0,
      rotation: 0,
    });
    setNext(getRandomPiece());
    setIsClearing(false);
    setIsStarted(true);
  }, [isStarted]);

  const keyHandler = React.useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      const { key } = event;

      if (key === " ") {
        startGame();
        return;
      }

      if (!isStarted || isClearing) {
        return;
      }

      if (key === "ArrowDown") {
        moveDown();
      } else if (key === "ArrowLeft") {
        moveLeft();
      } else if (key === "ArrowRight") {
        moveRight();
      } else if (key === "ArrowUp") {
        rotate();
      }
    },
    [isStarted, isClearing, startGame, moveDown, moveLeft, moveRight, rotate]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", keyHandler, false);

    return () => {
      document.removeEventListener("keydown", keyHandler, false);
    };
  }, [keyHandler]);

  return (
    <Stage height={StageHeight} width={StageWidth} className="game-stage">
      <Outline />
      <Next piece={next} pieceVisible={isStarted} />
      <Scoreboard score={score} lines={lines} />
      <Field>
        {isStarted && currentPiece && <Tetromino {...currentPiece} />}
        {isStarted &&
          currentField
            .slice(1, FieldHeightBlocks + 1)
            .map((s) => s.slice(1, FieldWidthBlocks + 1))
            .map((s, i) =>
              s.map((t, j) =>
                t > 0 ? <Block x={j} y={i} color={t} key={`${j},${i}`} /> : null
              )
            )}
      </Field>
    </Stage>
  );
};

function getRandomPiece(): Piece {
  return Math.floor(Math.random() * Math.floor(7));
}
