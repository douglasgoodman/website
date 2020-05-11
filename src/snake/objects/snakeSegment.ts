import { IDrawable } from "../types/interfaces";
import { Position } from "../types/position";
import { Canvas } from "../canvas";

export class SnakeSegment implements IDrawable {
  private static readonly segmentSize: number = 5;

  public position: Position;

  constructor(private context: Canvas, position: Position) {
    this.position = position;
  }

  public draw(): void {
    this.context.drawSquare(
      this.position.X,
      this.position.Y,
      SnakeSegment.segmentSize,
      "#aaaaaa"
    );
  }
}
