import { createResource } from '../resource';
import { getCurrentPosition } from './location';

export const getWeather = ({ latitude, longitude }) => (
  fetch(`http://localhost:3001/forecast/${latitude},${longitude}`)
    .then(response => response.json())
);

export const weather = createResource((coords) => (
  getWeather(coords)
));

export const currentPositionWeather = createResource(async () => {
  const { coords } = await getCurrentPosition();

  const {
    hourly: {
      summary,
    },
  } = await getWeather(coords);

  return summary;
});
