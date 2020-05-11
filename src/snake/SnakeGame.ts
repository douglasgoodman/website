import { Canvas } from "./canvas";
import { Timer } from "./types/timer";
import { Snake } from "./objects/snake";
import { Direction } from "./types/enums";
import { Position } from "./types/position";

export class SnakeGame {
  private score: number = 0;
  private canvas: Canvas;
  private timer: Timer;
  private snake?: Snake;

  constructor(
    private context: CanvasRenderingContext2D,
    private scoreCallback: (score: number) => void,
    private timerCallback: (timer: number) => void
  ) {
    this.canvas = new Canvas(context);
    this.timer = new Timer(500, this.tick);
  }

  public start() {
    console.log("game started!!");
    this.canvas.fill("#000000");
    this.snake = new Snake(this.canvas, new Position(200, 200));
    this.snake.draw();
    this.timer.start();
  }

  public stop() {
    console.log("game stopped");
    this.timer.stop();
  }

  public pause() {
    this.timer.togglePause();
  }

  private tick = (elapsed: number) => {
    // get direction
    this.snake?.update(Direction.Right);
    // check collisions
    this.timerCallback(elapsed);
  };
}
