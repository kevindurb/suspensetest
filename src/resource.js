const RESOLVED = Symbol('RESOLVED');
const PENDING = Symbol('PENDING');
const NOT_STARTED = Symbol('NOT_STARTED');
const REJECTED = Symbol('REJECTED');

export const createResource = (fn) => {
  const cache = {};

  const createCacheKey = JSON.stringify;

  const getCache = (key) => (cache[key] || {
    status: NOT_STARTED,
    value: null,
  });

  const setCache = (key, value) => {
    cache[key] = value;
  }

  const setPending = (key, thenable) => {
    const result = getCache(key);
    setCache(key, {
      ...result,
      status: PENDING,
      value: thenable,
    })
  };

  const setResolved = (key, value) => {
    const result = getCache(key);
    setCache(key, {
      ...result,
      status: RESOLVED,
      value,
    });
  };

  const setRejected = (key, error) => {
    const result = getCache(key);
    setCache(key, {
      ...result,
      status: REJECTED,
      value: error,
    });
  };

  return {
    read(...args) {
      const key = createCacheKey(args);
      const result = getCache(key, cache);
      switch (result.status) {
        case NOT_STARTED: {
          const thenable = Promise.resolve(fn(...args))
            .then((data) => {
              setResolved(key, data);
              return data;
            })
            .catch((error) => {
              setRejected(key, error);
              return error;
            });
          setPending(key, thenable);
          throw thenable;
        }
        case PENDING: {
          const thenable = result.value;
          return thenable;
        }
        case RESOLVED: {
          const value = result.value;
          return value;
        }
        case REJECTED: {
          const error = result.value;
          return error;
        }
        default: {
          // should be unreachable
          return undefined;
        }
      }
    },
    invalidate(...args) {
      const key = createCacheKey(args);
      setCache(key, undefined);
    }
  };
};
