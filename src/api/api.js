import axios from "axios";
const development = true;

const url = 'http://cedd-2401-4900-421c-fe19-18fb-4852-2d8-48a3.ngrok.io';

export const server = axios.create({
  baseURL: url,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const adminRegister = (data) => server.post(`${url}/admin-register`, data);
export const adminLogin = (data) =>
  server.post(`${url}/admin-login`, data);

/*
Router.post('/submit-request', PostUserRequest);
Router.post('/admin-login', AdminLogin);
Router.post('/admin-register', AdminRegister);
Router.get('/public-data', PublicData);
*/