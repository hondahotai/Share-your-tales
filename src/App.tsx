/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Router from './navigation/Router.tsx';
import {ApolloProvider} from '@apollo/client';
import client from './libs/apollo/client.ts';
import {ThemeProvider} from './providers/ThemeContext.tsx';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
