import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Clients from './components/Clients';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});// declare client variables


function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Header />
      {/* //header location componenets */}
      <div className="container">
        <Clients />
      </div>
    </ApolloProvider>
    </>
  );
}

export default App;
