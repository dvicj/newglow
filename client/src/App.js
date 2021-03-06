import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ApolloProvider} from 'apollo-boost';
import {Provider} from 'react-redux';
import store from './redux/store';
import './App.css';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <div>
        <Provider store={store}>
        </Provider>
      </div>
    </Router>
  </ApolloProvider>
  );
}

export default App;
