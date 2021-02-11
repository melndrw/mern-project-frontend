import React from 'react';
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
              <Route path="/:userId/places" exact component={UserPlaces} />
              <Route path="/places/:placeId" exact component={UpdatePlace} />
              {/* <Redirect to="/" /> */}
            </Switch>
          </main>
        </Router>
      </Container>
    </ChakraProvider>
  );
};

export default App;
