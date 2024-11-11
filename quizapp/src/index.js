import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Ensure there is an element with id="root" in index.html
);