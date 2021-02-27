import React, { lazy, Suspense } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { ChakraProvider, extendTheme, Container } from '@chakra-ui/react';
import Users from './users/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hooks';
import LoadingSpinner from './shared/components/UIElements/Spinner/LoadingSpinner';

const NewPlaces = lazy(() => import('./places/pages/NewPlaces/NewPlaces'));
const UserPlaces = lazy(() => import('./places/pages/UserPlaces/UserPlaces'));
const UpdatePlace = lazy(() =>
  import('./places/pages/UpdatePlace/UpdatePlace')
);
const Authenticate = lazy(() =>
  import('./users/pages/Authentication/Authenticate')
);

const colors = {
  brand: {
    900: '#75cfb8',
    800: '#bbdfc8',
    700: '#f0e5d8',
  },
};

const theme = extendTheme({ colors });

const App = () => {
  const { token, userId, login, logout } = useAuth();

  let routes;

  if (!token) {
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
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            login: login,
            logout: logout,
          }}
        >
          <Router>
            <MainNavigation />
            <main>
              <Suspense
                fallback={
                  <div className="center">
                    <LoadingSpinner asOverlay />
                  </div>
                }
              >
                {routes}
              </Suspense>
            </main>
          </Router>
        </AuthContext.Provider>
      </Container>
    </ChakraProvider>
  );
};

export default App;
