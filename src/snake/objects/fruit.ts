import { IDrawable } from "../types/interfaces";
import { Canvas } from "../canvas";
import { Position } from "../types/position";
import { getRandomInteger } from "../utils";

export class Fruit implements IDrawable {
  public position: Position;

  constructor(private canvas: Canvas, private size: number) {
    const x = getRandomInteger(0, canvas.width / size) * size;
    const y = getRandomInteger(0, canvas.height / size) * size;
    this.position = new Position(x, y);
  }

  public draw() {
    this.canvas.drawCircle(this.position, this.size, "#00ff0099");
  }
}
