import { useState, useEffect, useCallback } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState();
  const [userId, setuserId] = useState();
  const [tokenExpirationDate, seTtokenExpirationDate] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    const tokenExpDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    seTtokenExpirationDate(tokenExpDate);
    setToken(token);
    setuserId(uid);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setuserId(null);
    seTtokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration > new Date())
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, userId, login, logout };
};
