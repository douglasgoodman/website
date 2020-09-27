import { Block } from "./Block";
import { Level } from "./Levels";

export class Pyramid {
  private blocks: Block[];
  private flashInterval: number = 0;

  constructor(private level: Level) {
    this.blocks = [];

    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < row + 1; col++) {
        const b = new Block(row, col, level);
        this.blocks.push(b);
      }
    }

    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < row + 1; col++) {
        const block = this.getBlock(row, col);
        if (block) {
          block.upLeft = this.getBlock(row - 1, col - 1);
          block.upRight = this.getBlock(row - 1, col);
          block.downLeft = this.getBlock(row + 1, col);
          block.downRight = this.getBlock(row + 1, col + 1);
        }
      }
    }
  }

  private getBlock(row: number, column: number) {
    return this.blocks.find((b) => b.row === row && b.column === column);
  }

  public getTopBlock() {
    return this.blocks[0];
  }

  public draw() {
    this.blocks.forEach((b) => b.draw());
  }

  public isLevelComplete() {
    return !this.blocks.some((b) => !b.isComplete());
  }

  public flash = () => {
    this.flashInterval = window.setInterval(() => {
      this.blocks.forEach((b) => b.flash());
    }, 100);
  };

  public stopFlash() {
    if (this.flashInterval !== 0) {
      window.clearInterval(this.flashInterval);
    }
  }
}
