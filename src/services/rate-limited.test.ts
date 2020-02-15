import RateLimited from "./rate-limited";

const INTERVAL = 100;
const LIMIT = 1;
const FN_CALL_COUNT = 3;

class Counter {
  private counter: number = 0;

  @RateLimited(LIMIT, INTERVAL)
  public inc() {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        this.counter += 1;
        resolve();
      }, 0);
    });
  }

  public get value() {
    return this.counter;
  }
}

test("@RateLimited() annotation should throttle method calls", async () => {
  const counter = new Counter();

  const startTime = Date.now();

  await Promise.all(
    new Array(FN_CALL_COUNT).fill(undefined).map(_ => counter.inc())
  );

  const endTime = Date.now();
  const deltaTime = endTime - startTime;
  expect(deltaTime).toBeGreaterThanOrEqual(INTERVAL * (FN_CALL_COUNT - 1));
});
