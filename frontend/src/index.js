import React from 'react';
import {Link, BrowserRouter as Router} from 'react-router-dom'
import ReactDOM from 'react-dom';
import App from './containers/App';
require('./app.less');

ReactDOM.render(
    <Router>
        <App/>
    </Router>
    , document.getElementById('app'));

