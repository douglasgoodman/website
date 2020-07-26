import * as React from "react";
import { Layer, Line } from "react-konva";
import {
  FieldWidthBlocks,
  FieldHeightBlocks,
  DashBoardOffsetBlocks,
  DashboardWidthBlocks,
  NextHeightBlocks,
  StageWidth,
  StageHeight,
} from "./constants";
import { Block } from "./pieces";

const OutlineBlockColor = 0;

function createBlock(x: number, y: number) {
  return <Block x={x} y={y} color={OutlineBlockColor} key={`${x},${y}`} />;
}

export const Outline = () => {
  const blocks: { x: number; y: number }[] = [];

  const addBlock = (x: number, y: number) => {
    if (!blocks.some((b) => b.x === x && b.y === y)) {
      blocks.push({ x, y });
    }
  };

  for (let x = 0; x < FieldWidthBlocks + 2; x++) {
    addBlock(x, 0);
  }

  for (let y = 1; y < FieldHeightBlocks + 1; y++) {
    addBlock(0, y);
    addBlock(FieldWidthBlocks + 1, y);
  }

  for (let x = 0; x < FieldWidthBlocks + 2; x++) {
    addBlock(x, FieldHeightBlocks + 1);
  }

  for (
    let x = DashBoardOffsetBlocks;
    x < DashBoardOffsetBlocks + DashboardWidthBlocks;
    x++
  ) {
    addBlock(x, 0);
  }

  for (let y = 1; y < FieldHeightBlocks + 1; y++) {
    addBlock(DashBoardOffsetBlocks, y);
    addBlock(DashBoardOffsetBlocks + DashboardWidthBlocks - 1, y);
  }

  for (
    let x = DashBoardOffsetBlocks;
    x < DashBoardOffsetBlocks + DashboardWidthBlocks;
    x++
  ) {
    addBlock(x, NextHeightBlocks + 1);
  }

  for (
    let x = DashBoardOffsetBlocks;
    x < DashBoardOffsetBlocks + DashboardWidthBlocks;
    x++
  ) {
    addBlock(x, FieldHeightBlocks + 1);
  }

  return (
    <Layer>
      <Line
        points={[
          0,
          0,
          StageWidth,
          0,
          StageWidth,
          StageHeight,
          0,
          StageHeight,
          0,
          0,
        ]}
        stroke="black"
        fill="black"
        closed
        strokeWidth={1}
      />
      {blocks.map((b) => createBlock(b.x, b.y))}
    </Layer>
  );
};
