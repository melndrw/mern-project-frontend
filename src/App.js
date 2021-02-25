import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { ChakraProvider, extendTheme, Container } from '@chakra-ui/react';
import Users from './users/pages/Users';
import NewPlaces from './places/pages/NewPlaces/NewPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace/UpdatePlace';
import Authenticate from './users/pages/Authentication/Authenticate';
import { AuthContext } from './shared/context/auth-context';

const colors = {
  brand: {
    900: '#75cfb8',
    800: '#bbdfc8',
    700: '#f0e5d8',
  },
};

const theme = extendTheme({ colors });

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setuserId] = useState();

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setuserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setuserId(null);
  }, []);

  let routes;

  if (!isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:userId/places" exact component={UserPlaces} />
        <Route path="/auth" exact component={Authenticate} />
        <Redirect to="/auth" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:userId/places" exact component={UserPlaces} />

        <Route path="/places/new" exact component={NewPlaces} />
        <Route path="/places/:placeId" exact component={UpdatePlace} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <Container maxWidth="100%">
        <AuthContext.Provider
          value={{
            isLoggedIn: isLoggedIn,
            userId: userId,
            login: login,
            logout: logout,
          }}
        >
          <Router>
            <MainNavigation />
            <main>{routes}</main>
          </Router>
        </AuthContext.Provider>
      </Container>
    </ChakraProvider>
  );
};

export default App;
