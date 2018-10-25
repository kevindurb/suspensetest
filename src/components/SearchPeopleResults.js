import React from 'react';
import { people } from '../resources/starwars';

export default React.memo(({
  query
}) => {
  const { results } = people.read(query);

  if (!results) return null;

  return results.map((person) => (
    <div>{person.name}</div>
  ));
})
