import { Canvas } from "./canvas";
import { Timer } from "./types/timer";
import { Snake } from "./objects/snake";
import { Direction, DirectionKey } from "./types/enums";
import { Position } from "./types/position";

export class SnakeGame {
  private score: number = 0;
  private canvas: Canvas;
  private timer: Timer;
  private snake: Snake;
  private direction: Direction = Direction.Right;
  private elapsedSeconds: number = 0;

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
  }

  public start() {
    this.canvas.fill("#000000");
    this.snake = new Snake(this.canvas, this.snakeSize, new Position(200, 200));
    this.direction = Direction.Right;
    this.score = 0;
    this.timer.start();
  }

  public stop() {
    this.timer.stop();
    // kill snake object
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
    if (
      this.snake.position.X < this.canvas.left ||
      this.snake.position.X >= this.canvas.right ||
      this.snake.position.Y < this.canvas.top ||
      this.snake.position.Y >= this.canvas.bottom
    ) {
      this.snake.die();
      this.stop();
      this.dataCallback(this.score, this.elapsedSeconds, false);
    }
  }

  private tick = (elapsed: number) => {
    this.elapsedSeconds = elapsed;
    this.canvas.fill("#000000");
    this.snake.update(this.direction);
    this.checkCollisions();
    this.score++;
    this.dataCallback(this.score, this.elapsedSeconds, true);
  };
}
