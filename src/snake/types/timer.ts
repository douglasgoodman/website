export class Timer {
  private isRunning: boolean = false;
  private elapsed: number = 0;
  private intervalId: NodeJS.Timeout | undefined = undefined;

  constructor(
    private interval: number,
    private handler: (elapsed: number) => void
  ) {}

  public start() {
    this.elapsed = 0;
    this.isRunning = true;
    this.intervalId = setInterval(this.tick, this.interval);
  }

  private tick = () => {
    if (this.isRunning) {
      this.elapsed += this.interval;
      this.handler(this.elapsed / 1000);
    }
  };

  public stop() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  public togglePause() {
    this.isRunning = !this.isRunning;
  }
}
