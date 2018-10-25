import React, { Suspense } from 'react';

const SearchPeople = React.lazy(() => import('./SearchPeople'));

export default React.memo(() => (
  <Suspense fallback={<div>LOADING</div>}>
    <SearchPeople />
  </Suspense>
));
