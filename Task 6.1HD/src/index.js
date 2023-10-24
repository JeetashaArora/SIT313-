import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AuthContextProvider} from"./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    {/* Wrapping the app component with AuthContextProvider */}
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);