import { createResource } from '../resource';

export const weather = createResource((lat, long) => (
  fetch(`http://localhost:3001/forecast/${lat},${long}`)
    .then(response => response.json())
));
