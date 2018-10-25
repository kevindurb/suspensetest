import React from 'react';
import { createResource } from './resource';

const resource = createResource((id) => (
  fetch(`http://localhost:3001/people/${id}`)
    .then(res => res.json())
));

export default React.memo(({ id }) => {
  const person = resource.read(id);
  return (
    <div key={person.id}>{person.name}</div>
  );
});
