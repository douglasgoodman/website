import { IAnimatable } from "../types/interfaces";
import { Position } from "../types/position";
import { Canvas } from "../canvas";
import { getRandomInteger } from "../utils";

export class SnakeSegment implements IAnimatable {
  public animationPosition: Position;
  public lastPosition: Position;
  public lastMoveTime: number;

  private _position: Position;
  public get position() {
    return this._position;
  }

  public set position(position: Position) {
    this.lastPosition = this._position;
    this._position = position.copy();
    this.animationPosition = this.position;
    this.lastMoveTime = Date.now();
  }

  private static readonly colors: string[] = [
    "#ff000066",
    "#00ff0066",
    "#0000ff66",
    "#ffff0066",
    "#00ffff66",
    "#ff00ff66",
  ];

  private static readonly colorDead: string = "#804040";

  private color: string;
  private isAlive: boolean = true;

  constructor(
    protected canvas: Canvas,
    protected snakeSize: number,
    position: Position
  ) {
    this.color =
      SnakeSegment.colors[getRandomInteger(0, SnakeSegment.colors.length)];
    this._position = position;
    this.lastPosition = this.position;
    this.animationPosition = this.position;
    this.lastMoveTime = Date.now();
  }

  public die() {
    this.isAlive = false;
  }

  updateAnimationPosition(delta: number) {
    const x =
      this.lastPosition.X + (this.position.X - this.lastPosition.X) * delta;
    const y =
      this.lastPosition.Y + (this.position.Y - this.lastPosition.Y) * delta;
    this.animationPosition = new Position(x, y);
  }

  public draw(): void {
    this.canvas.drawCircle(
      this.animationPosition,
      this.snakeSize,
      this.isAlive ? this.color : SnakeSegment.colorDead
    );
  }
}
