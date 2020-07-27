import * as React from "react";
import { Field } from "./Field";
import { Piece, PieceProps, PieceSize, Block } from "./pieces";
import { Stage } from "react-konva";
import {
  StageWidth,
  StageHeight,
  FieldWidthBlocks,
  FieldHeightBlocks,
  GameSpeed,
} from "./constants";
import { Outline } from "./Outline";
import { Next } from "./Next";
import { Scoreboard } from "./Scoreboard";
import { Tetromino } from "./pieces";
import { PieceStates, PieceColors } from "./pieces/types";
import { useInterval } from "./useInterval";
import { useKeydown } from "./useKeydown";
import { ThemeContext } from "./ThemeContext";

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

function getRandomPiece(): Piece {
  return Math.floor(Math.random() * Math.floor(7));
}

export const Game = () => {
  const [isStarted, setIsStarted] = React.useState(false);
  const [timerDelay, setTimerDelay] = React.useState(GameSpeed);
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
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
  const [clearFlashCount, setClearFlashCount] = React.useState(0);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [gameOverLine, setGameOverLine] = React.useState(0);

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
    if (!isStarted || isClearing || isGameOver) {
      return;
    }

    const { x } = currentPiece;
    const newPiece = { ...currentPiece, x: x - 1 };

    if (!isCollision(newPiece)) {
      setCurrentPiece(newPiece);
    }
  }, [currentPiece, isClearing, isCollision, isGameOver, isStarted]);

  const moveRight = React.useCallback(() => {
    if (!isStarted || isClearing || isGameOver) {
      return;
    }

    const { x } = currentPiece;
    const newPiece = { ...currentPiece, x: x + 1 };

    if (!isCollision(newPiece)) {
      setCurrentPiece(newPiece);
    }
  }, [currentPiece, isClearing, isCollision, isGameOver, isStarted]);

  const moveDown = React.useCallback((): boolean => {
    if (!isStarted || isClearing || isGameOver) {
      return false;
    }

    const { y } = currentPiece;
    const newPiece = { ...currentPiece, y: y + 1 };

    if (!isCollision(newPiece)) {
      setCurrentPiece(newPiece);
      return true;
    }

    return false;
  }, [currentPiece, isClearing, isCollision, isGameOver, isStarted]);

  const rotate = React.useCallback(() => {
    if (!isStarted || isClearing || isGameOver) {
      return;
    }

    const { rotation } = currentPiece;
    const newPiece = { ...currentPiece, rotation: (rotation + 1) % 4 };

    if (!isCollision(newPiece)) {
      setCurrentPiece(newPiece);
    }
  }, [currentPiece, isClearing, isCollision, isGameOver, isStarted]);

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
      setClearFlashCount(6);
      setTimerDelay(80);
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

      setLines((prevLines) => prevLines + currentLines.length);
      if (currentLines.length === 4) {
        setScore((prevScore) => prevScore + 800);
      } else {
        setScore((prevScore) => prevScore + currentLines.length * 100);
      }
      setCurrentField(field);
      setCurrentLines([]);
      setIsClearing(false);
    }
  }, [currentLines, currentField]);

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
      setIsGameOver(true);
      setGameOverLine(1);
      setTimerDelay(50);
    }
  };

  const tick = () => {
    if (!isStarted) {
      return;
    }

    if (isClearing) {
      if (clearFlashCount > 0) {
        setClearFlashCount((prevCount) => prevCount - 1);
      } else {
        removeLines();
        nextPiece();
        setTimerDelay(GameSpeed);
      }
      return;
    }

    if (isGameOver) {
      if (gameOverLine > FieldHeightBlocks) {
        setIsTimerRunning(false);
        return;
      }
      const field = currentField.map((f) => f.slice());
      for (let i = 1; i <= FieldWidthBlocks; i++) {
        field[gameOverLine][i] = 1;
      }
      setCurrentField(field);
      setGameOverLine((prevLine) => prevLine + 1);
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

  useInterval(tick, isTimerRunning ? timerDelay : undefined);

  const startGame = React.useCallback(() => {
    if (isStarted && !isGameOver) {
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
    setIsGameOver(false);
    setIsStarted(true);
    setTimerDelay(GameSpeed);
    setIsTimerRunning(true);
  }, [isGameOver, isStarted]);

  useKeydown(" ", startGame);
  useKeydown("ArrowDown", moveDown);
  useKeydown("ArrowLeft", moveLeft);
  useKeydown("ArrowRight", moveRight);
  useKeydown("ArrowUp", rotate);

  // react-konva requires bridging the context into the Stage component
  const themeBridge = React.useContext(ThemeContext);

  return (
    <Stage height={StageHeight} width={StageWidth} className="game-stage">
      <ThemeContext.Provider value={themeBridge}>
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
                  t > 0 ? (
                    <Block
                      x={j}
                      y={i}
                      color={t}
                      highlight={
                        isClearing &&
                        currentLines.includes(i + 1) &&
                        clearFlashCount % 2 === 0
                      }
                      key={`${j},${i}`}
                    />
                  ) : null
                )
              )}
        </Field>
      </ThemeContext.Provider>
    </Stage>
  );
};
