import React, { Suspense } from 'react';

const Weather = React.lazy(() => import('./Weather'));

export default React.memo(() => (
  <Suspense fallback={<div>LOADING</div>}>
    <Weather />
  </Suspense>
));
