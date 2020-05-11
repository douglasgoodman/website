import { Position } from "../types/position";
import { Canvas } from "../canvas";
import { Direction } from "../types/enums";
import { SnakeSegment } from "./snakeSegment";

export class Snake extends SnakeSegment {
  private length: number = 5;
  private segments: SnakeSegment[] = [];

  constructor(private canvas: Canvas, position: Position) {
    super(canvas, position);

    this.segments.push(this);
    for (var i = 1; i < this.length; i++) {
      this.segments.push(
        new SnakeSegment(
          this.canvas,
          new Position(this.position.X - i * 5, this.position.Y)
        )
      );
    }
  }

  public update(direction: Direction) {
    this.position.X += 5;
    this.draw();
  }
}
