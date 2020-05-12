import { Position } from "./position";

export interface IDrawable {
  position: Position;
  draw(): void;
}

export interface IAnimatable extends IDrawable {
  lastPosition: Position;
  lastMoveTime: number;
  animationPosition: Position;
  updateAnimationPosition(delta: number): void;
}
