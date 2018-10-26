const RESOLVED = Symbol('RESOLVED');
const PENDING = Symbol('PENDING');
const NOT_STARTED = Symbol('NOT_STARTED');

export const createResource = (fn) => {
  const cache = {};

  const createCacheKey = JSON.stringify;

  const getCache = (key) => (cache[key] || {
    status: NOT_STARTED,
    value: null,
    thenable: null,
  });

  const setCache = (key, value) => {
    cache[key] = value;
  }

  const setPending = (key, thenable) => {
    const result = getCache(key);
    setCache(key, {
      ...result,
      status: PENDING,
      thenable,
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
            .catch(() => {
              setCache(key, undefined);
            });
          setPending(key, thenable);
          throw thenable;
        }
        case PENDING: {
          throw result.thenable;
        }
        case RESOLVED: {
          return result.value;
        }
        default:
          return undefined;
      }
    },
    invalidate(...args) {
      const key = createCacheKey(args);
      setCache(key, undefined);
    }
  };
};

const isPromise = (x) => (
  'then' in x && typeof x.then === 'function'
);

export const getResourceValue = (resource) => (...args) =>
  new Promise((resolve, reject) => {
    try {
      resolve(resource.read(...args));
    } catch (e) {
      if (isPromise(e)) {
        e
        .then(resolve)
        .catch(reject);
      } else {
        reject(e);
      }
    }
  });
