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
    let x = this.position.X;
    let y = this.position.Y;

    if (direction === Direction.Up) {
      y -= this.snakeSize;
    } else if (direction === Direction.Down) {
      y += this.snakeSize;
    } else if (direction === Direction.Left) {
      x -= this.snakeSize;
    } else {
      x += this.snakeSize;
    }

    this.position = new Position(x, y);
  }

  private updateSegments() {
    for (var i = this.length; i >= 1; i--) {
      this.segments[i].position = this.segments[i - 1].position;
    }
  }

  public update(direction: Direction) {
    this.updateSegments();
    this.move(direction);
  }

  public animate(time: number, snakeSpeed: number) {
    const delta = Math.min((Date.now() - this.lastMoveTime) / snakeSpeed, 1);
    this.segments.forEach((s) => s.updateAnimationPosition(delta));
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
      this.position.X < 0 ||
      this.position.X > this.canvas.width ||
      this.position.Y < 0 ||
      this.position.Y > this.canvas.height
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
