export class Position {
  constructor(public X: number, public Y: number) {}

  public copy(): Position {
    return new Position(this.X, this.Y);
  }

  public equals(other: Position): boolean {
    return this.X === other.X && this.Y === other.Y;
  }
}
