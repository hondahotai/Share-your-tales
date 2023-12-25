/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './navigation/Router.tsx';
import {ApolloProvider} from '@apollo/client';
import client from './apollo/client.ts';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from './context/ThemeContext.tsx';
import {MMKV} from 'react-native-mmkv';

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
