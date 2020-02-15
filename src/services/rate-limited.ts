import pThrottle from "p-throttle";

function RateLimited(limit: number, interval: number) {
  return function(
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = pThrottle(
      function(this: any, ...args: any[]) {
        return original.apply(this, args);
      },
      limit,
      interval
    );

    return descriptor;
  };
}

export default RateLimited;
