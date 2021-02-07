import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Users from './users/pages/Users';
import NewPlaces from './places/pages/NewPlaces';
import { ChakraProvider, extendTheme, Container } from '@chakra-ui/react';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';

const colors = {
  brand: {
    900: '#75cfb8',
    800: '#bbdfc8',
    700: '#f0e5d8',
  },
};

const theme = extendTheme({ colors });

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Container maxWidth="100%">
        <Router>
          <MainNavigation />
          <main>
            <Switch>
              <Route path="/" exact component={Users} />
              <Route path="/places/new" exact component={NewPlaces} />
              <Redirect to="/" />
            </Switch>
          </main>
        </Router>
      </Container>
    </ChakraProvider>
  );
};

export default App;
