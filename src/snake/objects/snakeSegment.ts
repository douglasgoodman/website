import { IDrawable } from "../types/interfaces";
import { Position } from "../types/position";
import { Canvas } from "../canvas";

export class SnakeSegment implements IDrawable {
  private static readonly colors: string[] = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#00ffff",
    "#ff00ff",
  ];

  private static readonly colorDead: string = "#804040";
  private color: string;

  protected isAlive: boolean = true;

  constructor(
    protected canvas: Canvas,
    protected snakeSize: number,
    public position: Position
  ) {
    this.color =
      SnakeSegment.colors[
        Math.floor(Math.random() * Math.floor(SnakeSegment.colors.length - 1))
      ];
  }

  public die() {
    this.isAlive = false;
  }

  public draw(): void {
    this.canvas.drawSquare(
      this.position.X,
      this.position.Y,
      this.snakeSize,
      this.isAlive ? this.color : SnakeSegment.colorDead
    );
  }
}
