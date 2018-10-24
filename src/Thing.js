import React from 'react';
import { createResource } from './resource';
const resource = createResource();

export default React.memo(({ id }) => {
  const person = resource.read(`http://localhost:3001/people/${id}`);
  return (
    <div key={person.id}>{person.name}</div>
  );
});
