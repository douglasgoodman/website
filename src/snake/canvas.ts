export class Canvas {
  public readonly width: number;
  public readonly height: number;

  constructor(
    private context: CanvasRenderingContext2D,
    private snakeSize: number
  ) {
    this.width = context.canvas.width;
    this.height = context.canvas.height;
  }

  public fill(color: string) {
    this.context.beginPath();
    this.context.rect(0, 0, this.width, this.height);
    this.context.fillStyle = color;
    this.context.fill();
  }

  public drawSquare(x: number, y: number, size: number, color: string) {
    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.fillRect(x, y, size, size);
  }

  public get top(): number {
    return this.snakeSize;
  }

  public get bottom(): number {
    return this.height - this.snakeSize;
  }

  public get left(): number {
    return this.snakeSize;
  }

  public get right(): number {
    return this.width - this.snakeSize;
  }
}
