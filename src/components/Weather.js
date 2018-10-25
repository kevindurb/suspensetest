import React from 'react';
import { currentPositionWeather } from '../resources/weather';

export default React.memo(() => {
  const summary = currentPositionWeather.read();

  return (<div>{summary}</div>);
});
