import {useEffect} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {TaskDetails, TaskEditePage} from "./pages";
import {useAppContext} from "./context/AppContext";
import {TaskService} from "./services";
import {Main} from "./pages";

import './css/App.css';
import {PersonService} from "./services/PersonService";

export const BASE_URL = process.env.REACT_APP_BACKEND_URL || '/';

function App() {
    const s = useAppContext()


    // init app
    useEffect(() => {
        TaskService.getTasks(s)
        PersonService.getList(s)
    }, [s.selectedDay]);


    return (
        <Routes>
            <Route path={BASE_URL} element={<Main />} />
            <Route path={'/task/:taskID'} element={<TaskDetails />} />
            <Route path={'/task/:taskID/edite'} element={<TaskEditePage />} />
            <Route path={'*'} element={<Navigate to={BASE_URL} />} />
        </Routes>
    )
}

export default App;
