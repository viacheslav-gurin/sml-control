import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import initValues from './fixtures/initValues';
import './styles/main.scss';
import Control from './components/Control/Control';


const store = configureStore();

const jsxToRender: JSX.Element = (
  <Provider store={store}>
      <Control initialValues={initValues} />
  </Provider>
);

ReactDOM.render(jsxToRender, document.getElementById('root'));