const cache = {
};

const getCache = (key) => (cache[key] || {
  status: 'NOT_STARTED',
  value: null,
});

const setCache = (key, value) => {
  cache[key] = value;
}

const setPending = (key) => {
  const result = getCache(key);
  setCache(key, {
    ...result,
    status: 'PENDING',
  })
};

const setSuccess = (key, value) => {
  const result = getCache(key);
  setCache(key, {
    ...result,
    status: 'SUCCESS',
    value,
  })
};

export const createResource = () => ({
  read(path) {
    const result = getCache(path);
    switch (result.status) {
      case 'NOT_STARTED':
        setPending(path)
        throw fetch(path)
          .then(r => r.json())
          .then((data) => {
            setSuccess(path, data);
            return data;
          });
      case 'PENDING':
        return undefined;
      case 'SUCCESS':
        return result.value;
      default:
        return undefined;
    }
  },
  invalidate(path) {
    setCache(path, undefined);
  }
});
