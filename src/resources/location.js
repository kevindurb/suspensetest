import { createResource } from '../resource';

export const currentLocation = createResource((options) => (
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
));
