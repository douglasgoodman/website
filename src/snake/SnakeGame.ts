import { Canvas } from "./canvas";
import { Timer } from "./types/timer";
import { Snake } from "./objects/snake";
import { Direction, DirectionKey } from "./types/enums";
import { Position } from "./types/position";
import { Fruit } from "./objects/fruit";

export class SnakeGame {
  private score: number = 0;
  private canvas: Canvas;
  private timer: Timer;
  private snake: Snake;
  private fruit: Fruit;
  private direction: Direction = Direction.Right;
  private elapsedSeconds: number = 0;
  private isRunning: boolean = false;

  constructor(
    context: CanvasRenderingContext2D,
    private snakeSize: number,
    snakeSpeed: number,
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
    this.snake = new Snake(this.canvas, this.snakeSize, new Position(200, 200));
    this.fruit = new Fruit(this.canvas, this.snakeSize);
    this.direction = Direction.Right;
    this.score = 0;
    this.isRunning = true;
    this.timer.start();
  }

  public stop() {
    this.isRunning = false;
    this.timer.stop();
    // kill snake object?
  }

  public pause() {
    this.timer.togglePause();
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
    this.canvas.fill("#000000");
    this.snake.update(this.direction);
    this.checkCollisions();
    this.fruit.draw();
    this.callback();
  };

  private callback() {
    this.dataCallback(this.score, this.elapsedSeconds, this.isRunning);
  }
}
