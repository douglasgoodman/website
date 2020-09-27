import {
  TopBlockX,
  TopBlockY,
  BlockSpacingY,
  BlockSize,
  PlayerSize,
} from "../constants";
import { drawPolygon } from "../canvas";
import { Direction } from "../enums";
import { Level } from "./Levels";

export class Block {
  private x: number;
  private y: number;

  private maxColor: number;
  private blockState: number = 0;

  public upLeft?: Block;
  public upRight?: Block;
  public downLeft?: Block;
  public downRight?: Block;

  public playerX: number;
  public playerY: number;

  constructor(public row: number, public column: number, private level: Level) {
    this.x = TopBlockX - BlockSize * (row / 2 - column);
    this.y = TopBlockY + row * BlockSpacingY;

    this.playerX = this.x - PlayerSize / 2;
    this.playerY = this.y - BlockSize / 4 - PlayerSize;

    this.maxColor = this.level.topColors.length - 1;
  }

  public getNeighbor(direction: Direction) {
    switch (direction) {
      case Direction.UpLeft:
        return this.upLeft;
      case Direction.UpRight:
        return this.upRight;
      case Direction.DownLeft:
        return this.downLeft;
      case Direction.DownRight:
        return this.downRight;
    }
  }

  public draw() {
    drawPolygon(
      [
        { x: this.x, y: this.y },
        { x: this.x - BlockSize / 2, y: this.y - BlockSize / 4 },
        { x: this.x, y: this.y - BlockSize / 2 },
        { x: this.x + BlockSize / 2, y: this.y - BlockSize / 4 },
        { x: this.x, y: this.y },
      ],
      this.level.topColors[this.blockState]
    );

    drawPolygon(
      [
        { x: this.x, y: this.y },
        { x: this.x, y: this.y + BlockSize / 2 },
        { x: this.x - BlockSize / 2, y: this.y + BlockSize / 4 },
        { x: this.x - BlockSize / 2, y: this.y - BlockSize / 4 },
        { x: this.x, y: this.y },
      ],
      this.level.leftColor
    );

    drawPolygon(
      [
        { x: this.x, y: this.y },
        { x: this.x + BlockSize / 2, y: this.y - BlockSize / 4 },
        { x: this.x + BlockSize / 2, y: this.y + BlockSize / 4 },
        { x: this.x, y: this.y + BlockSize / 2 },
        { x: this.x, y: this.y },
      ],
      this.level.rightColor
    );
  }

  public isComplete(): boolean {
    return this.blockState === this.maxColor;
  }

  public visit(): number {
    if (this.level.canChangeBack) {
    } else {
      const prevBlockState = this.blockState;
      this.blockState = Math.min(this.blockState + 1, this.maxColor);
      if (this.blockState > prevBlockState) {
        return this.level.visitedPoints[prevBlockState];
      }
    }
    return 0;
  }

  public flash = () => {
    this.blockState++;
    if (this.blockState > this.maxColor) {
      this.blockState = 0;
    }
  };
}
