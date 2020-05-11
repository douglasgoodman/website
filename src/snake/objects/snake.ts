import { Position } from "../types/position";
import { Canvas } from "../canvas";
import { Direction } from "../types/enums";
import { SnakeSegment } from "./snakeSegment";

export class Snake extends SnakeSegment {
  private length: number = 10;
  private segments: SnakeSegment[] = [];

  constructor(private canvas: Canvas, snakeSize: number, position: Position) {
    super(canvas, snakeSize, position);

    this.segments.push(this);
    for (var i = 1; i <= this.length; i++) {
      this.segments.push(
        new SnakeSegment(
          this.canvas,
          snakeSize,
          new Position(this.position.X - i * snakeSize, this.position.Y)
        )
      );
    }
  }

  private move(direction: Direction) {
    if (direction === Direction.Up) {
      this.position.Y -= this.snakeSize;
    } else if (direction === Direction.Down) {
      this.position.Y += this.snakeSize;
    } else if (direction === Direction.Left) {
      this.position.X -= this.snakeSize;
    } else {
      this.position.X += this.snakeSize;
    }
  }

  private updateSegments() {
    console.log(this.segments);
    for (var i = 1; i <= this.length; i++) {
      this.segments[i].position = this.segments[i - 1].position.copy();
    }
  }

  public update(direction: Direction) {
    this.updateSegments();
    this.move(direction);
    this.segments.forEach((s) => s.draw());
  }

  public die() {
    this.isAlive = false;
    this.draw();
  }
}
