import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Intro from './components/intro/Intro.component';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <AppRouter/> */}
    <Intro>
      <App />
    </Intro>


  </React.StrictMode>
);

