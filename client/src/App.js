import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';



const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache,//impliemtsed from const cache
});// declare client variables


function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Router>
      <Header />
      {/* //header location componenets */}
      <div className="container">
       <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='*' element = {<NotFound />} />
        <Route path='/project/:id' element = {<Project />} />
       </Routes>
      </div>
      </Router>
    </ApolloProvider>
    </>
  );
}

export default App;
