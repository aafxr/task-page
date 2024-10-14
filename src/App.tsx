import {useEffect} from "react";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";

import {ErrorMessageComponent} from "./components/ErrorMessageComponent";
import {setTGThemeColor} from "./utils/setTGThemeColor";
import {PersonService} from "./services/PersonService";
import {AuthMessage} from "./components/AuthMessage";
import {TaskDetails, TaskEditePage} from "./pages";
import {useAppContext} from "./context/AppContext";
import {Container} from "./components/Container";
import {CompanyPage} from "./pages/CompanyPage";
import {NewTask} from "./pages/NewTask";
import {TaskService} from "./services";
import {fetchHasPermit} from "./api";
import {Main} from "./pages";

import './css/App.css';
import {QueryNav} from "./components/QueryNav";
import {TestPage} from "./pages/TestPage/TestPage";

export const BASE_URL = process.env.REACT_APP_BACKEND_URL || '/';

function App() {
    const s = useAppContext()
    const navigate = useNavigate()
    const {pathname} = useLocation()


    useEffect(() => {
        setInterval(() => {
            fetchHasPermit()
                .then(({ok, user}) => {
                    if (ok) s.updateAppContext(p => p.loggedIn === ok ? p : {...p, loggedIn: true, user})
                    else s.updateAppContext(p => p.loggedIn === ok ? p : {...p, loggedIn: false, user: undefined})
                })
                .catch(console.error)
        }, 30_000)

        fetchHasPermit()
            .then(({ok, user}) => {
                if (ok) s.updateAppContext(p => p.loggedIn === ok ? p : {...p, loggedIn: true, user})
                else s.updateAppContext(p => p.loggedIn === ok ? p : {...p, loggedIn: false, user: undefined})
            })
            .catch(console.error)
    }, []);


    // init app
    useEffect(() => {
        if (s.loggedIn) {
            TaskService.getTasks(s)
            PersonService.getList(s)
        }
    }, [s.selectedDay, s.loggedIn]);


    useEffect(() => {
        let id: number
        if (!('Telegram' in window)) {
            id = window.setInterval(() => tgInit(), 50)
        }
        const tgInit = () => {
            if ('Telegram' in window && id) clearInterval(id)
            Telegram.WebApp.ready()
            Telegram.WebApp.disableVerticalSwipes()
            Telegram.WebApp.expand()
            Telegram.WebApp.BackButton.onClick(() => navigate(-1))
            Telegram.WebApp.onEvent('themeChanged', setTGThemeColor)
            setTGThemeColor()
        }

        tgInit()

    }, []);


    useEffect(() => {
        pathname === BASE_URL
            ? Telegram.WebApp.BackButton.hide()
            : Telegram.WebApp.BackButton.show()
    }, [pathname]);


    if (s.loggedIn === false) {
        return (
            <div className='wrapper'>
                <div className='content'>
                    <Container className='unauthorized-container'>
                        <ErrorMessageComponent>
                            <AuthMessage/>
                        </ErrorMessageComponent>
                    </Container>
                </div>
            </div>
        )
    }


    return (
        <>
            <QueryNav name={'page'} />
            <Routes>
                <Route path={BASE_URL} element={<Main/>}/>
                <Route path={BASE_URL + 'task/new'} element={<NewTask/>}/>
                <Route path={BASE_URL + 'task/:taskID'} element={<TaskDetails/>}/>
                <Route path={BASE_URL + 'task/:taskID/:companyID'} element={<CompanyPage/>}/>
                <Route path={BASE_URL + 'task/:taskID/edite'} element={<TaskEditePage/>}/>
                <Route path={BASE_URL + 'test'} element={<TestPage/>}/>
                <Route path={'*'} element={<Navigate to={BASE_URL}/>}/>
            </Routes>
        </>
    )
}

export default App;
