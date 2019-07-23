import ApolloClient from 'apollo-boost';
const uri = process.env.GRAPHQL_ENDPOINT;
const client = new ApolloClient({
  uri
});

export default client;
