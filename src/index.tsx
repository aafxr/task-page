import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import './css/index.css';

import {AppContextProvider} from "./context/AppContext";
import {setFixedVH} from "./utils/setFixedVH";
import App from './App';

//===================== установка фикчированного vh ================================================
setFixedVH()
window.addEventListener('resize', setFixedVH)
//==================================================================================================


// if (window.BX24) {
//     window.BX24.init(() => console.log("BX24 init"))
//     window.BX24.callMethod(
//         'user.get',
//         {
//             ACTIVE: true,
//             USER_TYPE: 'employee',
//             ADMIN_MODE: true
//         },
//         console.log
//     )
// }


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AppContextProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AppContextProvider>
    </React.StrictMode>
);
