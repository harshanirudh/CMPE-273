import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css"
import 'reactjs-popup/dist/index.css';
import "react-image-gallery/styles/css/image-gallery.css";
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {Provider} from'react-redux';
import {store,persiststore} from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import axios from 'axios'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
// const { store, persistor } = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persiststore}>
    <App />
    </PersistGate>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

axios.interceptors.request.use(req => {
  // Important: request interceptors **must** return the request.
  req.headers['Authorization']='jwt '+store.getState().Login.token
  console.log(`From Interceptor ${req.method} `,req.headers);
    return req;
  });
  axios.interceptors.response.use(res=>{
    console.log(`From Interceptor `,res.data);
    return res;
  })
