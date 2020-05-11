import { IDrawable } from "../types/interfaces";
import { Position } from "../types/position";
import { Canvas } from "../canvas";

export class SnakeSegment implements IDrawable {
  private static readonly colorAlive: string = "#aaaaaa";
  private static readonly colorDead: string = "#ff0000";

  protected isAlive: boolean = true;

  constructor(
    private context: Canvas,
    protected snakeSize: number,
    public position: Position
  ) {}

  public draw(): void {
    this.context.drawSquare(
      this.position.X,
      this.position.Y,
      this.snakeSize,
      this.isAlive ? SnakeSegment.colorAlive : SnakeSegment.colorDead
    );
  }
}
