import {createRef} from 'react';

export const navigationRef = createRef();
export const isMountedRef = createRef();
export const routeNameRef = createRef();

const navigate = (name, params) => {
  if (navigationRef.current) {
    // console.log('OK?', params);
    return navigationRef.current.navigate(name, params);
  } else {
    console.error('I am in error not in isMountedRef');
  }
};

const reset = (name, params) => {
  if (navigationRef.current) {
    return navigationRef.current.reset({
      index: 0,
      routes: [
        {
          name,
          params,
        },
      ],
    });
  } else {
    console.error('!!!!not mounted yet!!!!!!!');
  }
};

export default {
  navigate,
  reset,
  routeNameRef,
};
