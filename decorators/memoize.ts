export function memoize() {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const cache: Object = {};
    const originalMethod = descriptor.value;
    const memoizedMethod = (...args) => {
      const key = args.join("-");
      if (!cache.hasOwnProperty(key)) {
        const result = originalMethod.call(this, ...args);
        cache[key] = result;
        return result;
      }
      return cache[key];
    };
    descriptor.value = memoizedMethod;
  };
}
