import * as React from "react";
import { Line, Group } from "react-konva";
import { BlockSize, BlockBevelWidth } from "../constants";

export interface BlockProps {
  x: number;
  y: number;
  color: number;
  highlight?: boolean;
  key?: string;
}

interface ColorShades {
  color: string;
  light: string;
  medium: string;
  dark: string;
}

// https://coolors.co/f94d50-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590
const ColorPalettes: ColorShades[] = [
  { color: "#aaaaaa", light: "#cccccc", medium: "#888888", dark: "#666666" }, // Gray!
  { color: "#F94144", light: "#fcb0b2", medium: "#f7262a", dark: "#760406" }, // Red Salsa
  { color: "#F3722C", light: "#f8b18b", medium: "#e75a0d", dark: "#873408" }, // Orange Red
  { color: "#F8961E", light: "#fbc888", medium: "#ed8607", dark: "#8b4e04" }, // Yellow Orange
  { color: "#F9C74F", light: "#fce5b0", medium: "#f7b926", dark: "#765404" }, // MaizeCrayola
  { color: "#90BE6D", light: "#c9dfb9", medium: "#7eb356", dark: "#44632c" }, // Pistachio
  { color: "#43AA8B", light: "#8ad0bb", medium: "#3a9278", dark: "#235848" }, // Zomp
  { color: "#577590", light: "#b3c3d1", medium: "#4d6880", dark: "#2e3e4d" }, // QueenBlue
];

export const Block = (props: BlockProps) => {
  const x = props.x * BlockSize;
  const y = props.y * BlockSize;

  const topLeft = [x, y];
  const topRight = [x + BlockSize, y];
  const bottomLeft = [x, y + BlockSize];
  const bottomRight = [x + BlockSize, y + BlockSize];

  const topLeftBevel = [x + BlockBevelWidth, y + BlockBevelWidth];
  const topRightBevel = [x + BlockSize - BlockBevelWidth, y + BlockBevelWidth];
  const bottomLeftBevel = [
    x + BlockBevelWidth,
    y + BlockSize - BlockBevelWidth,
  ];
  const bottomRightBevel = [
    x + BlockSize - BlockBevelWidth,
    y + BlockSize - BlockBevelWidth,
  ];

  return (
    <Group>
      <Line
        points={[
          ...topLeft,
          ...topRight,
          ...topRightBevel,
          ...topLeftBevel,
          ...topLeft,
        ]}
        closed
        fill={ColorPalettes[props.color].light}
      />
      <Line
        points={[
          ...topLeft,
          ...bottomLeft,
          ...bottomLeftBevel,
          ...topLeftBevel,
          ...topLeft,
        ]}
        closed
        fill={ColorPalettes[props.color].medium}
      />
      <Line
        points={[
          ...topRight,
          ...bottomRight,
          ...bottomRightBevel,
          ...topRightBevel,
          ...topRight,
        ]}
        closed
        fill={ColorPalettes[props.color].medium}
      />
      <Line
        points={[
          ...bottomLeft,
          ...bottomRight,
          ...bottomRightBevel,
          ...bottomLeftBevel,
          ...bottomLeft,
        ]}
        closed
        fill={ColorPalettes[props.color].dark}
      />
      <Line
        points={[
          ...topLeftBevel,
          ...topRightBevel,
          ...bottomRightBevel,
          ...bottomLeftBevel,
          ...topLeftBevel,
        ]}
        closed
        fill={ColorPalettes[props.color].color}
      />
    </Group>
  );
};
