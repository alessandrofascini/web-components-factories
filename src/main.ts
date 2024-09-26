import { App } from "./App";

import "./style.scss";
import { StopWatch, TimeoutGenerator } from "./lib/stopwatch";

App.NewApp();

function assert(condition: boolean, error: string | Error) {
  if (condition) {
    throw typeof error === "string" ? new Error(error) : error;
  }
}

class PolynomialGenerator implements TimeoutGenerator {
  iteration: number = 0;

  constructor(
    protected step: number = 10,
    protected start: number = 50,
    protected end: number = 1000,
    protected grade: number = 2.5,
  ) {
    assert(this.step < 0, "step < 0");
    assert(this.start < 0, "start < 0");
    assert(this.end < 0, "end < 0");
    assert(this.start === this.end, "start must be not equal to end");
    assert(this.grade <= 0, "grade < 0");

    // they must be integer
    this.step = this.step >> 0;
    this.start = this.start >> 0;
    this.end = this.end >> 0;
    if (this.end < this.start) {
      [this.start, this.end] = [this.end, this.start];
    }
  }

  f(x: number): number {
    return Math.ceil(
      ((this.end - this.start) / this.step ** this.grade) * x ** this.grade +
        this.start,
    );
  }

  Next(): number {
    this.iteration = Math.min(this.iteration + 1, this.step);
    return this.f(this.iteration);
  }

  Reset(): number {
    this.iteration = 0;
    return this.start;
  }
}

const gen = new PolynomialGenerator();
const sw = new StopWatch(gen, () => {
  console.log("hi", gen.iteration, gen.f(gen.iteration));
  return false;
});

sw.Start();
