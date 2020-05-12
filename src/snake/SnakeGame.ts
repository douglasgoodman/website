import { Canvas } from "./canvas";
import { Timer } from "./types/timer";
import { Snake } from "./objects/snake";
import { Direction, DirectionKey } from "./types/enums";
import { Position } from "./types/position";
import { Fruit } from "./objects/fruit";
import { Star } from "./objects/star";
import { getRandomInteger } from "./utils";

export class SnakeGame {
  private static readonly starCount: number = 35;

  private score: number = 0;
  private canvas: Canvas;
  private timer: Timer;
  private snake: Snake;
  private fruit: Fruit;
  private direction: Direction = Direction.Right;
  private elapsedSeconds: number = 0;
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private stars: Star[] = [];

  constructor(
    context: CanvasRenderingContext2D,
    private snakeSize: number,
    private snakeSpeed: number,
    private dataCallback: (
      score: number,
      elapsedSeconds: number,
      isRunning: boolean
    ) => void
  ) {
    this.canvas = new Canvas(context, snakeSize);
    this.timer = new Timer(snakeSpeed, this.tick);
    this.snake = new Snake(this.canvas, this.snakeSize, new Position(200, 200));
    this.fruit = new Fruit(this.canvas, this.snakeSize);
  }

  public start() {
    this.canvas.fill("#000000");
    this.generateStarField();
    this.snake = new Snake(this.canvas, this.snakeSize, new Position(200, 200));
    this.fruit = new Fruit(this.canvas, this.snakeSize);
    this.direction = Direction.Right;
    this.score = 0;
    this.isRunning = true;
    this.isPaused = false;
    this.timer.start();
    requestAnimationFrame(this.animate);
  }

  private generateStarField() {
    this.stars = [];
    for (var i = 0; i < SnakeGame.starCount; i++) {
      this.stars.push(
        new Star(
          this.canvas,
          new Position(
            getRandomInteger(0, this.canvas.width),
            getRandomInteger(0, this.canvas.height)
          )
        )
      );
    }
  }

  private animate = (time: number) => {
    this.canvas.fill("#000000");
    this.drawStarField();
    this.snake.animate(time, this.snakeSpeed);
    this.fruit.draw();

    if (this.isRunning && !this.isPaused) {
      requestAnimationFrame(this.animate);
    }
  };

  public drawStarField() {
    this.stars.forEach((s) => s.draw());
  }

  public stop() {
    this.isRunning = false;
    this.isPaused = false;
    this.timer.stop();
    // kill snake object?
  }

  public pause() {
    this.isPaused = this.timer.togglePause();
    if (!this.isPaused) {
      requestAnimationFrame(this.animate);
    }
  }

  public setLastKey(key: string) {
    if (key === DirectionKey.Up) {
      this.direction = Direction.Up;
    } else if (key === DirectionKey.Down) {
      this.direction = Direction.Down;
    } else if (key === DirectionKey.Left) {
      this.direction = Direction.Left;
    } else if (key === DirectionKey.Right) {
      this.direction = Direction.Right;
    }

    // force
    //this.tick(this.elapsedSeconds);
  }

  private checkCollisions() {
    if (this.snake.hasBorderCollision() || this.snake.hasSelfCollision()) {
      this.snake.kill();
      this.stop();
      return;
    }

    if (this.snake.position.equals(this.fruit.position)) {
      this.score++;
      this.fruit = new Fruit(this.canvas, this.snakeSize);
      this.snake.lengthen();
    }
  }

  private tick = (elapsed: number) => {
    this.elapsedSeconds = elapsed;
    this.snake.update(this.direction);
    this.checkCollisions();
    this.callback();
  };

  private callback() {
    this.dataCallback(this.score, this.elapsedSeconds, this.isRunning);
  }
}
