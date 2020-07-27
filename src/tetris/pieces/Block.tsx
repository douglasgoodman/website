import * as React from "react";
import { Line, Group } from "react-konva";
import { BlockSize, BlockBevelWidth } from "../constants";
import { ThemeContext } from "../ThemeContext";

export interface BlockProps {
  x: number;
  y: number;
  color: number;
  highlight?: boolean;
  key?: string;
}

export const Block = (props: BlockProps) => {
  const theme = React.useContext(ThemeContext);

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
        fill={props.highlight ? "#ffffff" : theme[props.color].light}
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
        fill={props.highlight ? "#ffffff" : theme[props.color].medium}
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
        fill={props.highlight ? "#ffffff" : theme[props.color].medium}
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
        fill={props.highlight ? "#ffffff" : theme[props.color].dark}
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
        fill={theme[props.color].color}
      />
    </Group>
  );
};
