const resolveAll = (calls) => (...args) =>
  calls.forEach(({ resolve }) => resolve(...args));

const rejectAll = (calls) => (...args) =>
  calls.forEach(({ reject }) => reject(...args));

export const throttle = (fn, time = 200) => {
  let calls = [];
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    return new Promise((resolve, reject) => {
      calls.push({ resolve, reject });
      timeout = setTimeout(() => {
        Promise.resolve(fn(...args))
          .then(resolveAll(calls))
          .catch(rejectAll(calls))
      }, time);
    });
  };
};
