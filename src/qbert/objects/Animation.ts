export class Animation {
  private start: number = 0;
  private end: number = 0;
  private frameCount: number;
  private isFinished: boolean = false;

  constructor(
    duration: number,
    private frames: { x: number; y: number }[],
    private onTick: (x: number, y: number, frame: number) => void,
    private onFinish: () => void
  ) {
    this.start = Date.now();
    this.end = this.start + duration;
    this.frameCount = frames.length;
  }

  public tick() {
    const now = Date.now();

    if (now < this.end) {
      const frame = Math.floor(
        ((now - this.start) / (this.end - this.start)) * this.frameCount
      );

      this.onTick(this.frames[frame].x, this.frames[frame].y, frame);
    } else {
      if (!this.isFinished) {
        this.isFinished = true;
        this.onFinish();
      }
    }
  }
}
