import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  useId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
