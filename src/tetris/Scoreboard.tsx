import * as React from "react";
import { Layer, Text } from "react-konva";
import { ScoreboardOffsetX, ScoreboardOffsetY } from "./constants";

export const Scoreboard = (props: { score: number; lines: number }) => {
  return (
    <Layer x={ScoreboardOffsetX} y={ScoreboardOffsetY}>
      <Text fill="#cccccc" fontSize={24} text="Score" x={0} y={0} />
      <Text
        fill="#cccccc"
        fontSize={24}
        text={props.score.toString()}
        x={0}
        y={30}
      />
      <Text fill="#cccccc" fontSize={24} text="Lines" x={0} y={60} />
      <Text
        fill="#cccccc"
        fontSize={24}
        text={props.lines.toString()}
        x={0}
        y={90}
      />
    </Layer>
  );
};
