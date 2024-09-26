export interface TimeoutGenerator {
  Next(): number;

  Reset(): number;
}

export class StopWatch {
  private timeoutId?: any;

  constructor(
    protected timeoutGenerator: TimeoutGenerator,
    protected callback: (sw: StopWatch) => boolean | Promise<boolean>,
  ) {
    // Do Nothing
  }

  Start() {
    const rec = (ms: number) => {
      this.timeoutId = setTimeout(async () => {
        if (await this.callback(this)) {
          rec(this.timeoutGenerator.Reset());
          return;
        }
        rec(this.timeoutGenerator.Next());
      }, ms);
    };

    rec(this.timeoutGenerator.Reset());
  }

  Stop() {
    clearTimeout(this.timeoutId);
  }
}
