export const throttle = (fn, time = 2000) => {
  let rejectLast;
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    return new Promise((resolve, reject) => {
      if (rejectLast) { rejectLast(); }
      rejectLast = reject;

      timeout = setTimeout(() => {
        Promise.resolve(fn(...args))
          .then(resolve)
          .catch(reject)
      }, time);
    });
  };
};
