import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { createStore } from 'redux';
import rootReducer from './Redux/Reducer/IndexReducer'
import { composeWithDevTools } from '@redux-devtools/extension';
import { Provider } from 'react-redux';


const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(

  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

