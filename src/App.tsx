import {useEffect} from "react";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";

import {ErrorMessageComponent} from "./components/ErrorMessageComponent";
import {setTGThemeColor} from "./utils/setTGThemeColor";
import {PersonService} from "./services/PersonService";
import {AuthMessage} from "./components/AuthMessage";
import {fetchHasPermit} from "./api/fetchHasPermit";
import {TaskDetails, TaskEditePage} from "./pages";
import {useAppContext} from "./context/AppContext";
import {Container} from "./components/Container";
import {CompanyPage} from "./pages/CompanyPage";
import {NewTask} from "./pages/NewTask";
import {TaskService} from "./services";
import {Main} from "./pages";

import './css/App.css';

export const BASE_URL = process.env.REACT_APP_BACKEND_URL || '/';

function App() {
    const s = useAppContext()
    const navigate = useNavigate()
    const {pathname} = useLocation()


    useEffect(() => {
        setInterval(() => {
            fetchHasPermit()
                .then(r => {
                    if(r) s.updateAppContext(p => p.loggedIn === r ? p : {...p, loggedIn: true})
                    else s.updateAppContext(p => p.loggedIn === r ? p : {...p, loggedIn: false})
                })
                .catch(console.error)
        }, 60_000)

        fetchHasPermit()
            .then(r => {
                if(r) s.updateAppContext(p => p.loggedIn === r ? p : {...p, loggedIn: true})
                else s.updateAppContext(p => p.loggedIn === r ? p : {...p, loggedIn: false})
            })
            .catch(console.error)
    }, []);


    // init app
    useEffect(() => {
        if(s.loggedIn){
            TaskService.getTasks(s)
            PersonService.getList(s)
        }
    }, [s.selectedDay, s.loggedIn]);



    useEffect(() => {
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



    if(!s.loggedIn){
        return (
            <div className='wrapper'>
                <div className='content'>
                    <Container className='unauthorized-container'>
                        <ErrorMessageComponent>
                            <AuthMessage />
                        </ErrorMessageComponent>
                    </Container>
                </div>
            </div>
        )
    }


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
