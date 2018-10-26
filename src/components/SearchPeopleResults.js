import React from 'react';
import { people } from '../resources/starwars';

export default React.memo(({
  query
}) => {
  const response = people.read(query);

  return response.results.map((person) => (
    <div key={person.url}>{person.name}</div>
  ));
})
