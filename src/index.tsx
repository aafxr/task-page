import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


if (window.BX24){
    window.BX24.init(() => console.log("BX24 init"))
    window.BX24.callMethod(
        'user.get',
        {
            ACTIVE: true,
            USER_TYPE: 'employee',
            ADMIN_MODE: true
        },
        console.log
    )
}




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
