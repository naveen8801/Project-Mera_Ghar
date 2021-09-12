import axios from 'axios';

const url = 'http://localhost:5000';

export const server = axios.create({
  baseURL: url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const adminRegister = (data) =>
  server.post(`${url}/admin-register`, data);
export const adminLogin = (data) => server.post(`${url}/admin-login`, data);
export const DashboardData = () => server.get(`${url}/public-data`);
export const AdminData = () => server.get(`${url}/admin-data`);

/*
Router.post('/submit-request', PostUserRequest);
Router.post('/admin-login', AdminLogin);
Router.post('/admin-register', AdminRegister);
Router.get('/public-data', PublicData);
*/
