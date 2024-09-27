import {useEffect} from "react";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";

import {TaskDetails, TaskEditePage} from "./pages";
import {useAppContext} from "./context/AppContext";
import {TaskService} from "./services";
import {Main} from "./pages";

import './css/App.css';
import {PersonService} from "./services/PersonService";
import {bitrix} from "./bitrix";

export const BASE_URL = process.env.REACT_APP_BACKEND_URL || '/';

function App() {
    const s = useAppContext()
    const navigate = useNavigate()
    const {pathname} = useLocation()


    // init app
    useEffect(() => {
        bitrix.getAuth()
            .then(() => {
                TaskService.getTasks(s)
                PersonService.getList(s)
            })
    }, [s.selectedDay]);


    useEffect(() => {
        Telegram.WebApp.ready()
        Telegram.WebApp.disableVerticalSwipes()
        Telegram.WebApp.expand()
        Telegram.WebApp.BackButton.onClick(() => navigate(-1))
    }, []);


    useEffect(() => {
        pathname === BASE_URL
            ? Telegram.WebApp.BackButton.hide()
            : Telegram.WebApp.BackButton.show()
    }, [pathname]);


    return (
        <Routes>
            <Route path={BASE_URL} element={<Main/>}/>
            <Route path={BASE_URL + 'task/:taskID'} element={<TaskDetails/>}/>
            <Route path={BASE_URL + 'task/:taskID/edite'} element={<TaskEditePage/>}/>
            <Route path={BASE_URL + '*'} element={<Navigate to={BASE_URL}/>}/>
        </Routes>
    )
}

export default App;
