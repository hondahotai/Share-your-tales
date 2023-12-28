import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {storage} from '../storage.ts';

const httpLink = createHttpLink({
  uri: 'https://internship-social-media.purrweb.com/graphql',
});

const authLink = setContext((_, {headers}) => {
  const token = storage.getString('userToken');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
