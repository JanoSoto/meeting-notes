import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import './index.css.scss';
import InitialSetup from './InitialSetup';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <InitialSetup />
  </React.StrictMode>,
  document.getElementById('root')
);

window.onscroll = () => {
  let resume_container = document.querySelector('.resume-container');
  let resume_header = document.querySelector('.fixed-header');
  if (resume_container) {
    if (window.scrollY > 250) {
      resume_container.classList.add('fixed-sidebar');
      resume_header.classList.remove('fade-out');
      resume_header.classList.remove('hidden');
    }
    else {
      resume_container.classList.remove('fixed-sidebar');
      resume_header.classList.add('fade-out');
    }
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
