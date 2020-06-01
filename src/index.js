import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/App';
import AuthProvider from './store/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);