import React, { Suspense } from 'react';
import Thing from './Thing';

// const Thing = React.lazy(() => import('./Thing'));

export default React.memo(() => (
  <Suspense fallback={<div>LOADING</div>}>
    <Thing id={1}/>
  </Suspense>
));
