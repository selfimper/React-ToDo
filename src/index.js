import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Welcome from './Welcome'

ReactDOM.render(
    // <h1>Hi, world!</h1>,
    <Welcome name="Tennant"/>,
    document.getElementById('root2')
  );
