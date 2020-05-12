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

  public drawCircle(x: number, y: number, size: number, color: string) {
    this.context.beginPath();
    this.context.arc(x, y, size, 0, 2 * Math.PI, false);
    this.context.fillStyle = color;
    this.context.fill();
  }

  public get top(): number {
    return 0;
  }

  public get bottom(): number {
    return this.height;
  }

  public get left(): number {
    return 0;
  }

  public get right(): number {
    return this.width;
  }
}
