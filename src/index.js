import React from 'react';
import {render} from 'react-dom';

import App from './app';
import './index.css';

const target = document.querySelector('#root')

render(
  <App/>, target)
