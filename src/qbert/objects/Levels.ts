export interface Level {
  levelNumber: number;
  topColors: string[];
  leftColor: string;
  rightColor: string;
  leftSaucerRows: number[];
  rightSaucerRows: number[];
  visitedPoints: number[];
  canChangeBack: boolean;
  levelCompleteBonus: number;
}

export const Levels: Level[] = [
  {
    levelNumber: 1,
    topColors: ["#1d6cc8", "#e59d0b"],
    leftColor: "#a6a0a7",
    rightColor: "#555056",
    leftSaucerRows: [0],
    rightSaucerRows: [0],
    visitedPoints: [25],
    canChangeBack: false,
    levelCompleteBonus: 1000,
  },
  {
    levelNumber: 2,
    topColors: ["#ffd289", "#3b8cf0"],
    leftColor: "#ec9546",
    rightColor: "#555056",
    leftSaucerRows: [0],
    rightSaucerRows: [0],
    visitedPoints: [25],
    canChangeBack: false,
    levelCompleteBonus: 1000,
  },
];
