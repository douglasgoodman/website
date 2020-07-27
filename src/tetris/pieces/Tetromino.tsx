import * as React from "react";
import { Group } from "react-konva";
import { Block } from "./Block";
import { PieceProps, PieceSize, PieceStates, PieceColors } from "./types";

export const Tetromino = (props: PieceProps) => {
  const { piece, x, y, rotation } = props;
  const shape = PieceStates[piece].states[rotation];
  const { width, height } = PieceSize[piece];
  const { color } = PieceColors[piece];

  const blocks = [];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (shape[i][j]) {
        blocks.push(
          <Block key={`${x + j},${y + i}`} x={x + j} y={y + i} color={color} />
        );
      }
    }
  }
  return <Group>{blocks}</Group>;
};
