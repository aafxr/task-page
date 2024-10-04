import {useEffect, useState} from "react";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";

import {setTGThemeColor} from "./utils/setTGThemeColor";
import {PersonService} from "./services/PersonService";
import {TaskDetails, TaskEditePage} from "./pages";
import {useAppContext} from "./context/AppContext";
import {CompanyPage} from "./pages/CompanyPage";
import {NewTask} from "./pages/NewTask";
import {TaskService} from "./services";
import {Main} from "./pages";

import './css/App.css';
import {bitrix} from "./bitrix";

export const BASE_URL = process.env.REACT_APP_BACKEND_URL || '/';

function App() {
    const s = useAppContext()
    const navigate = useNavigate()
    const {pathname} = useLocation()


    //@ts-ignore
    // window.fetchIsAuthorized = fetchIsAuthorized

    // init app
    useEffect(() => {
        TaskService.getTasks(s)
        PersonService.getList(s)
    }, [s.selectedDay]);



    useEffect(() => {
        if(!('Telegram' in window)) window.location.reload()
        Telegram.WebApp.ready()
        Telegram.WebApp.disableVerticalSwipes()
        Telegram.WebApp.expand()
        Telegram.WebApp.BackButton.onClick(() => navigate(-1))
        Telegram.WebApp.onEvent('themeChanged', setTGThemeColor)
        setTGThemeColor()
    }, []);


    useEffect(() => {
        pathname === BASE_URL
            ? Telegram.WebApp.BackButton.hide()
            : Telegram.WebApp.BackButton.show()
    }, [pathname]);


    useEffect(() => {
        if(s.errorCode === 401 && Telegram.WebApp.initData){
            setTimeout(() => {
                bitrix.getAuth()
                    .then((auth) => auth && window.location.reload() )
                    .catch(console.error)
            }, 300)
        }
    }, [s.errorCode])


    return (
        <Routes>
            <Route path={BASE_URL} element={<Main/>}/>
            <Route path={BASE_URL + 'task/new'} element={<NewTask/>}/>
            <Route path={BASE_URL + 'task/:taskID'} element={<TaskDetails/>}/>
            <Route path={BASE_URL + 'task/:taskID/:companyID'} element={<CompanyPage/>}/>
            <Route path={BASE_URL + 'task/:taskID/edite'} element={<TaskEditePage/>}/>
            <Route path={'*'} element={<Navigate to={BASE_URL}/>}/>
        </Routes>
    )
}

export default App;
