import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import DataContextProvider from './context/DataContext';

ReactDOM.render(
  <Auth0Provider
    domain="dev-ppquhnol.us.auth0.com"
    clientId="7WkMb76BLYxhk94upAFw4ikvxWPGVhgN"
    redirectUri={window.location.origin}
  >
    <DataContextProvider>
      <Router>
        <div className="blurred-background"></div>
        <App />
      </Router>
    </DataContextProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
