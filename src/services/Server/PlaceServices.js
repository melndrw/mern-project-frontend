import axios from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-type': 'application.json',
  },
});

export const getSample = (id) => {
  return request
    .get(`/api/places/user/${id}`)
    .then((res) => res)
    .catch((err) => console.log(err));
};
