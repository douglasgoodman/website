export class Timer {
  private isRunning: boolean = false;
  private elapsed: number = 0;

  constructor(
    private interval: number,
    private handler: (elapsed: number) => void
  ) {}

  public start() {
    this.elapsed = 0;
    this.isRunning = true;
    setInterval(this.tick, this.interval);
  }

  private tick = () => {
    if (this.isRunning) {
      this.elapsed += this.interval;
      this.handler(this.elapsed / 1000);
    }
  };

  public stop() {
    this.isRunning = false;
  }

  public togglePause() {
    this.isRunning = !this.isRunning;
  }
}
