import * as React from "react";
import { Layer, Text } from "react-konva";
import { ScoreboardOffsetX, ScoreboardOffsetY } from "./constants";

const storageKey = "tetrishighscore";

const textProps = {
  fill: "#cccccc",
  fontFamily: '"PixelEmulator"',
  fontSize: 20,
};

export const Scoreboard = (props: { score: number; lines: number }) => {
  const [highScore, setHighScore] = React.useState(() => {
    return +(window.localStorage.getItem(storageKey) ?? 0);
  });

  React.useEffect(() => {
    if (props.score > highScore) {
      setHighScore(props.score);
      window.localStorage.setItem(storageKey, highScore.toString());
    }
  }, [props.score, highScore]);

  return (
    <Layer x={ScoreboardOffsetX} y={ScoreboardOffsetY}>
      <Text {...textProps} text="Score" x={0} y={0} />
      <Text {...textProps} text={props.score.toString()} x={0} y={30} />
      <Text {...textProps} text="Lines" x={0} y={60} />
      <Text {...textProps} text={props.lines.toString()} x={0} y={90} />
      <Text {...textProps} text="High Score" x={0} y={120} />
      <Text {...textProps} text={highScore.toString()} x={0} y={150} />
    </Layer>
  );
};
