import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider
    domain='dev-ppquhnol.us.auth0.com'
    clientId='7WkMb76BLYxhk94upAFw4ikvxWPGVhgN'
    redirectUri={window.location.origin}
  >
    <Router>
      <div className='blurred-background'></div>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
