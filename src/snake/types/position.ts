export class Position {
  constructor(public X: number, public Y: number) {}

  public copy(): Position {
    return new Position(this.X, this.Y);
  }
}
