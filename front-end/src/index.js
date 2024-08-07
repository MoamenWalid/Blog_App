import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import store from './components/redux/store';
import { Provider } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ store }>
    <App />
  </Provider>
);
