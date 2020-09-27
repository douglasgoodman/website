import { Pyramid, Player, Display, Level, Levels } from "./objects";
import { clearCanvas, setCanvas, drawTitleImage, drawText } from "./canvas";
import { Direction } from "./enums";
import { Sounds } from "./audio";
import {
  MaxLives,
  StartTextX,
  StartTextY,
  GameOverTextX,
  GameOverTextY,
} from "./constants";

export class QbertGame {
  private updateLoop?: number;
  private stopRenderLoop: boolean = false;
  private canMove: boolean = false;

  private level: Level;
  private pyramid: Pyramid;
  private player: Player;
  private display: Display;
  private livesRemaining: number;
  private score: number;

  constructor(
    canvas: CanvasRenderingContext2D,
    private onGameOver: () => void
  ) {
    setCanvas(canvas);
    this.level = Levels[0];
    this.pyramid = new Pyramid(this.level);
    this.player = new Player(
      this.pyramid.getTopBlock(),
      this.onPlayerDie,
      this.onScoreChange
    );
    this.display = new Display();
    this.livesRemaining = MaxLives;
    this.score = 0;
    clearCanvas();
    this.pyramid.draw();
    drawTitleImage();
    setTimeout(() => {
      this.drawStartText();
    }, 500);
  }

  public async start() {
    clearCanvas();
    this.pyramid.draw();
    this.display.draw(
      this.livesRemaining,
      this.score,
      this.level.levelNumber,
      ""
    );
    await Sounds.start();
    Sounds.qbertJump();
    this.updateLoop = window.setInterval(this.update, 10);
    this.loop();
    this.canMove = true;
  }

  public stop() {
    this.stopRenderLoop = true;
    this.drawGameOverText();
    this.drawStartText();
    this.onGameOver();
    window.clearInterval(this.updateLoop);
  }

  public move(direction: Direction) {
    if (!this.canMove) {
      return;
    }
    this.player.move(direction);
  }

  private loop = () => {
    if (this.stopRenderLoop) {
      return;
    }
    this.render();
    requestAnimationFrame(this.loop);
  };

  private update = () => {
    this.player.animate();
  };

  private render = () => {
    clearCanvas();
    if (this.player.isFalling) {
      this.player.draw();
      this.pyramid.draw();
    } else {
      this.pyramid.draw();
      this.player.draw();
    }
    this.display.draw(
      this.livesRemaining,
      this.score,
      this.level.levelNumber,
      "#ffffff"
    );
  };

  private drawStartText = () => {
    drawText(
      "Press spacebar to start",
      StartTextX,
      StartTextY,
      "30px",
      "#ffffff",
      "center"
    );
  };

  private drawGameOverText = () => {
    drawText(
      "Game Over",
      GameOverTextX,
      GameOverTextY,
      "30px",
      "#ffffff",
      "center"
    );
  };

  private onScoreChange = (points: number) => {
    this.score += points;
    if (this.pyramid.isLevelComplete()) {
      this.canMove = false;
      setTimeout(this.nextLevel, 500);
    }
  };

  public cheat() {
    this.canMove = false;
    setTimeout(this.nextLevel, 500);
  }

  private nextLevel = async () => {
    this.pyramid.flash();
    this.score += this.level.levelCompleteBonus;
    Sounds.levelComplete();
    setTimeout(async () => {
      const nextLevel =
        this.level.levelNumber > Levels.length - 1 ? 0 : this.level.levelNumber;
      this.pyramid.stopFlash();
      this.level = Levels[nextLevel];
      this.pyramid = new Pyramid(this.level);
      this.player.reset(this.pyramid.getTopBlock());
      await Sounds.start();
      Sounds.qbertJump();
      this.canMove = true;
    }, 3000);
  };

  private onPlayerDie = () => {
    setTimeout(() => {
      if (this.livesRemaining-- === 0) {
        this.stop();
        return;
      }

      this.player.reset(this.pyramid.getTopBlock());
      Sounds.qbertJump();
    }, 1000);
  };
}
