import {useEffect} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {TaskEditePage, TaskDetails} from "./pages";
import {useAppContext} from "./context/AppContext";
import {TaskService} from "./services";
import {Main} from "./pages";

import './css/App.css';


function App() {
    const s = useAppContext()


    useEffect(() => {
        TaskService.getTasks(s)
            .then(tl => s.updateAppContext(({...s, tasks: tl, tasksLoading: false})))
            .catch(e => s.updateAppContext(({...s, tasksLoading: false, error: e})))
    }, [s.selectedDay]);




    return (
        <Routes>
            <Route path={'/'} element={<Main />} />
            <Route path={'/task/:taskID'} element={<TaskDetails />} />
            <Route path={'/task/:taskID/edite'} element={<TaskEditePage />} />
            <Route path={'*'} element={<Navigate to={'/'} />} />
        </Routes>
    )
}

export default App;
