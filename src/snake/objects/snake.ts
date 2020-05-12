import { Position } from "../types/position";
import { Canvas } from "../canvas";
import { Direction } from "../types/enums";
import { SnakeSegment } from "./snakeSegment";

export class Snake extends SnakeSegment {
  private length: number = 5;
  private segments: SnakeSegment[] = [];

  constructor(canvas: Canvas, snakeSize: number, position: Position) {
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
    for (var i = this.length; i >= 1; i--) {
      this.segments[i].position = this.segments[i - 1].position.copy();
    }
  }

  public update(direction: Direction) {
    this.updateSegments();
    this.move(direction);
    this.drawSegments();
  }

  private drawSegments() {
    this.segments.forEach((s) => s.draw());
  }

  public kill() {
    this.segments.forEach((s) => s.die());
    this.drawSegments();
  }

  public hasBorderCollision(): boolean {
    return (
      this.position.X < this.canvas.left ||
      this.position.X > this.canvas.right ||
      this.position.Y < this.canvas.top ||
      this.position.Y > this.canvas.bottom
    );
  }

  public hasSelfCollision(): boolean {
    let collision = false;
    this.segments.forEach((s) => {
      if (s !== this && this.position.equals(s.position)) {
        collision = true;
      }
    });
    return collision;
  }

  public lengthen() {
    this.segments.push(
      new SnakeSegment(
        this.canvas,
        this.snakeSize,
        this.segments[this.length].position.copy()
      )
    );
    this.length++;
  }
}
