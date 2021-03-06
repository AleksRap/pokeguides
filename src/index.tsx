import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

/** Сброс стилей */
import 'normalize.css';

/** Высота вьюпорта с учетом панелей инструментов на мобилках */
import viewportHeight from './functions/viewportHeight';

/** Общие стили */
import './style/_index.scss';

import App from './App';

viewportHeight();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
