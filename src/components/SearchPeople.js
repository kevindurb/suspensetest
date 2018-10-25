import React, { Suspense } from 'react';
import * as Re from 'recompose';
import SearchPeopleResults from './SearchPeopleResults';

const enhance = Re.compose(
  Re.withState('query', 'setQuery', ''),
  Re.withHandlers({
    onSearch: ({ setQuery }) => (e) => setQuery(e.target.value),
  }),
);

export default enhance(React.memo(({ query, onSearch }) => (
  <>
  <input type="text" value={query} onChange={onSearch} />
  <Suspense fallback={<div>searching</div>}>
    <SearchPeopleResults query={query} />
  </Suspense>
  </>
)));
