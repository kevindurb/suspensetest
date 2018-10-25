import React from 'react';
import { currentLocation } from '../resources/location';
import { weather } from '../resources/weather';

export default React.memo(() => {
  const {
    coords: {
      latitude,
      longitude,
    },
  } = currentLocation.read();

  const {
    hourly: {
      summary,
    },
  } = weather.read(latitude, longitude);

  return (<div>{summary}</div>);
});
