import { IDrawable } from "../types/interfaces";
import { Canvas } from "../canvas";
import { Position } from "../types/position";

export class Fruit implements IDrawable {
  public position: Position;

  constructor(private canvas: Canvas, private size: number) {
    const x = Math.floor(Math.random() * Math.floor(canvas.width / 10)) * 10;
    const y = Math.floor(Math.random() * Math.floor(canvas.height / 10)) * 10;
    this.position = new Position(x, y);
  }

  public draw() {
    this.canvas.drawCircle(
      this.position.X + this.size / 2,
      this.position.Y + this.size / 2,
      this.size / 2,
      "#00ff00"
    );
  }
}
