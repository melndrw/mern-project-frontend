import axios from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export const getUsersRequest = () => {
  return request.get('/api/user/').then((res) => res.data);
};
