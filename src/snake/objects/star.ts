import { IDrawable } from "../types/interfaces";
import { Position } from "../types/position";
import { getRandomInteger } from "../utils";
import { Canvas } from "../canvas";

export class Star implements IDrawable {
  private static readonly maxSize: number = 6;
  private static readonly colors: string[] = [
    "#ffffff11",
    "#ffffff22",
    "#ffffff33",
    "#ffffff44",
    "#ffffff55",
    "#ffffff66",
    "#ffffff77",
    "#ffffff88",
  ];

  private color: string;
  private size: number;

  constructor(private canvas: Canvas, public position: Position) {
    this.color = Star.colors[getRandomInteger(0, Star.colors.length)];
    this.size = getRandomInteger(1, Star.maxSize);
  }

  public draw() {
    this.canvas.drawCircle(this.position, this.size, this.color);
  }
}
