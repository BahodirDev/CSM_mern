import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ContextAuth } from './components/context/auth';
import { ContextSearch } from './components/context/searchContext';
import 'antd/dist/reset.css';
import 'antd/dist/reset.css'
import { ContextCart } from './components/context/cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextAuth>
        <ContextSearch>
          <ContextCart>
            <App />
          </ContextCart>
        </ContextSearch>
      </ContextAuth>
    </BrowserRouter>
  </React.StrictMode>
);


