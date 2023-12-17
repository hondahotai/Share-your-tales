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
import {ApolloProvider} from "@apollo/client";
import client from "./apollo/client.ts";

function App() {
  return(
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>
  )
}

export default App;
