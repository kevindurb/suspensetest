import React, { Suspense } from 'react';

const Thing = React.lazy(() => import('./Thing'));

export default React.memo(() => (
  <Suspense fallback={<div>LOADING</div>}>
    <Thing />
  </Suspense>
));
