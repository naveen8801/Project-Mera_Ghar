import { server } from './api/api';

export const setAuthToken = (token) => {
  if (token) {
    server.defaults.headers.common['authorization'] = 'Bearer' + ' ' + token;
  } else {
    delete server.defaults.headers.common['authorization'];
  }
};
