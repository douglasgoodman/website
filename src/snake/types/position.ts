export class Position {
  private x: number;
  private y: number;

  public get X() {
    return this.x;
  }

  public get Y() {
    return this.y;
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public copy(): Position {
    return new Position(this.X, this.Y);
  }

  public equals(other: Position): boolean {
    return this.X === other.X && this.Y === other.Y;
  }
}
