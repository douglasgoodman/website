import { Position } from "./types/position";

export class Canvas {
  public readonly width: number;
  public readonly height: number;

  constructor(private context: CanvasRenderingContext2D, snakeSize: number) {
    this.width = context.canvas.width;
    this.height = context.canvas.height;
  }

  public fill(color: string) {
    this.context.beginPath();
    this.context.rect(0, 0, this.width, this.height);
    this.context.fillStyle = color;
    this.context.fill();
  }

  public drawSquare(position: Position, size: number, color: string) {
    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.fillRect(position.X, position.Y, size, size);
  }

  public drawCircle(position: Position, size: number, color: string) {
    this.context.beginPath();
    this.context.arc(
      position.X + size / 2,
      position.Y + size / 2,
      size / 2,
      0,
      2 * Math.PI,
      false
    );
    this.context.fillStyle = color;
    this.context.fill();
  }
}
