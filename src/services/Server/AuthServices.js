import axios from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authenticate = (data) => {
  return request.post('/api/user/signup', data).then((res) => res.data);
};

export const loginRequrest = (data) => {
  return request.post('api/user/login', data).then((res) => res);
};
