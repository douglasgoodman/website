import { drawImage } from "../canvas";
import { Block } from "./Block";
import { Direction } from "../enums";
import forwardRight from "../assets/images/forward-right.png";
import forwardRightJump from "../assets/images/forward-right-jump.png";
import forwardLeft from "../assets/images/forward-left.png";
import forwardLeftJump from "../assets/images/forward-left-jump.png";
import backRight from "../assets/images/back-right.png";
import backRightJump from "../assets/images/back-right-jump.png";
import backLeft from "../assets/images/back-left.png";
import backLeftJump from "../assets/images/back-left-jump.png";
import { PlayerSize, CanvasHeight } from "../constants";
import { Animation } from "./Animation";
import { Sounds } from "../audio";
import { BlockSize } from "../constants";

interface PlayerImages {
  forwardRight: HTMLImageElement;
  forwardRightJump: HTMLImageElement;
  forwardLeft: HTMLImageElement;
  forwardLeftJump: HTMLImageElement;
  backRight: HTMLImageElement;
  backRightJump: HTMLImageElement;
  backLeft: HTMLImageElement;
  backLeftJump: HTMLImageElement;
}

const JumpTime = 200;
const FallTime = 1500;
const JumpHeight = PlayerSize * 0.75;
const JumpArc = [0, 0.1, 0.6, 0.8, 0.9, 0.9, 0.8, 0.6, 0.1, 0];

export class Player {
  private images: PlayerImages;
  private nextBlock: Block;
  private x: number;
  private y: number;
  private currentDirection: Direction;
  private animation?: Animation;

  public isMoving: boolean = false;
  public isJumping: boolean = false;
  public isFalling: boolean = false;

  constructor(
    private currentBlock: Block,
    private onDie: () => void,
    private onScoreChange: (points: number) => void
  ) {
    this.images = {
      forwardRight: new Image(),
      forwardRightJump: new Image(),
      forwardLeft: new Image(),
      forwardLeftJump: new Image(),
      backRight: new Image(),
      backRightJump: new Image(),
      backLeft: new Image(),
      backLeftJump: new Image(),
    };

    this.images.forwardRight.src = forwardRight;
    this.images.forwardRightJump.src = forwardRightJump;
    this.images.forwardLeft.src = forwardLeft;
    this.images.forwardLeftJump.src = forwardLeftJump;
    this.images.backRight.src = backRight;
    this.images.backRightJump.src = backRightJump;
    this.images.backLeft.src = backLeft;
    this.images.backLeftJump.src = backLeftJump;

    this.x = this.currentBlock.playerX;
    this.y = this.currentBlock.playerY;

    this.nextBlock = this.currentBlock;
    this.currentDirection = Direction.DownRight;
  }

  public draw() {
    drawImage(this.getImage(), this.x, this.y, PlayerSize, PlayerSize);
  }

  public animate() {
    if (!this.isMoving || !this.animation) {
      return;
    }

    this.animation.tick();
  }

  public move(direction: Direction) {
    if (this.isMoving) {
      return;
    }

    this.currentDirection = direction;

    const next = this.currentBlock.getNeighbor(direction);
    if (next) {
      this.buildJumpAnimation(next);
    } else {
      this.buildFallAnimation(direction);
    }
  }

  public reset(block: Block) {
    this.currentBlock = block;
    this.currentDirection = Direction.DownRight;

    this.x = this.currentBlock.playerX;
    this.y = this.currentBlock.playerY;

    this.nextBlock = this.currentBlock;
  }

  private getJumpFrames(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    const frames = [];

    const distanceX = endX - startX;
    const distanceY = endY - startY;

    for (let i = 0; i < 10; i++) {
      frames.push({ x: this.x, y: this.y });
    }

    for (let i = 0; i < 100; i++) {
      const percent = i / 100;
      const arcIndex = Math.floor(JumpArc.length * percent);
      const xx = distanceX * percent;
      const yy = distanceY * percent - JumpArc[arcIndex] * JumpHeight;

      frames.push({ x: this.x + xx, y: this.y + yy });
    }

    return frames;
  }

  private getFallFrames(startX: number, startY: number) {
    const frames = [];
    for (let i = 0; i < CanvasHeight; i++) {
      frames.push({ x: startX, y: startY + i });
    }
    return frames;
  }

  private buildJumpAnimation(next: Block) {
    this.nextBlock = next;
    this.isMoving = true;

    this.animation = new Animation(
      JumpTime,
      this.getJumpFrames(
        this.currentBlock.playerX,
        this.currentBlock.playerY,
        next.playerX,
        next.playerY
      ),
      (x: number, y: number, frame: number) => {
        this.x = x;
        this.y = y;
        this.isJumping = frame > 10 && frame < 90;
      },
      this.land
    );
  }

  private land = () => {
    this.animation = undefined;
    this.isMoving = false;
    this.isJumping = false;
    this.currentBlock = this.nextBlock;
    const points = this.currentBlock.visit();
    this.onScoreChange(points);
    this.x = this.nextBlock.playerX;
    this.y = this.nextBlock.playerY;
    Sounds.qbertJump();
  };

  private buildFallAnimation(direction: Direction) {
    this.isMoving = true;

    const { playerX, playerY } = this.currentBlock;

    const endX =
      direction === Direction.UpLeft || direction === Direction.DownLeft
        ? playerX - BlockSize
        : playerX + BlockSize;
    const endY =
      direction === Direction.UpLeft || direction === Direction.UpRight
        ? playerY - BlockSize
        : playerY + BlockSize;

    let lastX = 0;
    let lastY = 0;

    this.animation = new Animation(
      JumpTime,
      this.getJumpFrames(playerX, playerY, endX, endY),
      (x: number, y: number, frame: number) => {
        this.x = lastX = x;
        this.y = lastY = y;
        this.isJumping = frame > 10;
      },
      () => {
        this.isFalling = true;
        Sounds.qbertFall();
        this.animation = new Animation(
          FallTime,
          this.getFallFrames(lastX, lastY),
          (x: number, y: number) => {
            this.x = x;
            this.y = y;
          },
          () => {
            this.isMoving = false;
            this.isJumping = false;
            this.isFalling = false;
            this.animation = undefined;
            this.onDie();
          }
        );
      }
    );
  }

  private getImage(): HTMLImageElement {
    switch (this.currentDirection) {
      case Direction.UpLeft:
        return this.isJumping ? this.images.backLeftJump : this.images.backLeft;
      case Direction.UpRight:
        return this.isJumping
          ? this.images.backRightJump
          : this.images.backRight;
      case Direction.DownLeft:
        return this.isJumping
          ? this.images.forwardLeftJump
          : this.images.forwardLeft;
      case Direction.DownRight:
        return this.isJumping
          ? this.images.forwardRightJump
          : this.images.forwardRight;
      default:
        return this.images.forwardRight;
    }
  }
}
