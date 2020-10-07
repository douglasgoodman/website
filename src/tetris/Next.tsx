import * as React from "react";
import { Layer, Text } from "react-konva";
import { NextOffsetX, NextOffsetY } from "./constants";
import { Piece } from "./pieces";
import { Tetromino } from "./pieces";

const textProps = {
  fill: "#cccccc",
  fontFamily: '"PixelEmulator"',
  fontSize: 20,
};

export const Next = (props: { pieceVisible: boolean; piece: Piece }) => {
  return (
    <Layer x={NextOffsetX} y={NextOffsetY}>
      <Text {...textProps} text="Next" x={0} y={0} />
      {props.pieceVisible && (
        <Tetromino piece={props.piece} x={1} y={2} rotation={0} />
      )}
    </Layer>
  );
};
