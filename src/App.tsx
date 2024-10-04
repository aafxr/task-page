import {useEffect} from "react";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";

import {setTGThemeColor} from "./utils/setTGThemeColor";
import {PersonService} from "./services/PersonService";
import {TaskDetails, TaskEditePage} from "./pages";
import {useAppContext} from "./context/AppContext";
import {CompanyPage} from "./pages/CompanyPage";
import {NewTask} from "./pages/NewTask";
import {ErrorService, TaskService} from "./services";
import {fetchIsAuthorized} from "./api/fetchIsAuthorized";
import {errors} from "./errors";
import {Main} from "./pages";

import './css/App.css';

export const BASE_URL = process.env.REACT_APP_BACKEND_URL || '/';

function App() {
    const s = useAppContext()
    const navigate = useNavigate()
    const {pathname} = useLocation()


    // useEffect(() => {
    //     fetchIsAuthorized()
    //         .then(r => !r && ErrorService.handleError(s)(new Error(errors.UNAUTHORIZED)))
    //         .catch(ErrorService.handleError(s))
    // }, []);

    //@ts-ignore
    window.fetchIsAuthorized = fetchIsAuthorized

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
