import { createResource } from '../resource';

const BASE_URL = 'https://swapi.co/api';

const getSwapi = (path) =>
  fetch(`${BASE_URL}${path}`)
    .then(res => res.json());

export const people = createResource((query) => (
  getSwapi(`/people?search=${encodeURIComponent(query)}`)
));
