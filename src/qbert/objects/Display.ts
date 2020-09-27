import { drawImage, drawText } from "../canvas";
import { CanvasWidth } from "../constants";
import lifeImage from "../assets/images/lives.png";

const DisplayConstants = {
  Player1: {
    X: CanvasWidth * 0.175,
    Y: 80,
  },
  Player2: {
    X: CanvasWidth - CanvasWidth * 0.175,
    Y: 80,
  },
  Score1: {
    X: CanvasWidth * 0.175,
    Y: 110,
  },
  Score2: {
    X: CanvasWidth - CanvasWidth * 0.175,
    Y: 110,
  },
  Level: {
    X: CanvasWidth / 2,
    Y: 80,
  },
  Lives: {
    X: CanvasWidth * 0.3,
    Y: 120,
  },
};

const PlayerFontColor = "#4037dd";
const ScoreFontColor = "#c8c4c9";
const LevelFontColor = "#9b585f";

const PlayerFontSize = "25px";
const ScoreFontSize = "25px";
const LevelFontSize = "25px";

export class Display {
  private lifeImage: HTMLImageElement;

  constructor() {
    this.lifeImage = new Image();
    this.lifeImage.src = lifeImage;
  }

  public draw(lives: number, score: number, level: number, changeTo: string) {
    drawText(
      "Player 1",
      DisplayConstants.Player1.X,
      DisplayConstants.Player1.Y,
      PlayerFontSize,
      PlayerFontColor,
      "center"
    );

    drawText(
      "Player 2",
      DisplayConstants.Player2.X,
      DisplayConstants.Player2.Y,
      PlayerFontSize,
      PlayerFontColor,
      "center"
    );

    drawText(
      score.toString().padStart(6, "0"),
      DisplayConstants.Score1.X,
      DisplayConstants.Score1.Y,
      ScoreFontSize,
      ScoreFontColor,
      "center"
    );

    drawText(
      "0".toString().padStart(6, "0"),
      DisplayConstants.Score2.X,
      DisplayConstants.Score2.Y,
      ScoreFontSize,
      ScoreFontColor,
      "center"
    );

    drawText(
      `Level: ${level}`,
      DisplayConstants.Level.X,
      DisplayConstants.Level.Y,
      LevelFontSize,
      LevelFontColor,
      "center"
    );

    let x = DisplayConstants.Lives.X;

    for (let i = 0; i < lives; i++) {
      drawImage(this.lifeImage, x, DisplayConstants.Lives.Y, 30, 20);
      x -= 40;
    }
  }
}
