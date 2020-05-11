import { Position } from "./position";

export interface IDrawable {
  position: Position;
  draw(): void;
}
