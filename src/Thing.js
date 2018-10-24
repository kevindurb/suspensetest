import React from 'react';
import { createResource } from './resource';
const resource = createResource('http://localhost:1337/people');

export default React.memo(() => {
  const people = resource.read();
  return people.map(person => (
    <div key={person.id}>{person.name}</div>
  ));
});
