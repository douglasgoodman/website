export class Canvas {
  private readonly width: number;
  private readonly height: number;

  constructor(private context: CanvasRenderingContext2D) {
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
}
