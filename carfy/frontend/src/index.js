import React from 'react'
import {render} from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

render((
    <BrowserRouter>
        <App  />
    </BrowserRouter>
    
), document.getElementById('root'));