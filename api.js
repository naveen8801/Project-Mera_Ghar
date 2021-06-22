import axios from 'axios';

const url = 'http://localhost:5000';

export const submitrequest = (data) => axios.post(`${url}/submit-request`, data);
