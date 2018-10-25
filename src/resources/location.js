import { createResource } from '../resource';

export const getCurrentPosition = (options) => (
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
);

export const currentPosition = createResource((options) => (
  getCurrentPosition(options)
));
