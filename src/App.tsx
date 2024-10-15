import {lazy, Suspense, useEffect} from "react";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";

import {ErrorMessageComponent} from "./components/ErrorMessageComponent";
import {setTGThemeColor} from "./utils/setTGThemeColor";
import {PersonService} from "./services/PersonService";
import {AlertMessage} from "./components/AlertMessage";
import {AuthMessage} from "./components/AuthMessage";
import {useAppContext} from "./context/AppContext";
import {Container} from "./components/Container";
import {QueryNav} from "./components/QueryNav";
import {NetStat} from "./components/NetStat";
import {TaskService} from "./services";
import {fetchHasPermit} from "./api";
import {Main} from "./pages";

import './css/App.css';
import {PageLoader} from "./components/PageLoader";

export const BASE_URL = process.env.REACT_APP_BACKEND_URL || '/';


const NewTaskLazy = lazy(() => import('./pages/NewTask/NewTask'))
const TaskDetailsLazy = lazy(() => import('./pages/TaskDetails/TaskDetails'))
const CompanyPageLazy = lazy(() => import('./pages/CompanyPage/CompanyPage'))
const TaskEditePageLazy = lazy(() => import('./pages/TaskEditePage/TaskEditePage'))
const TestPageLazy = lazy(() => import('./pages/TestPage/TestPage'))





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
            <NetStat />
            <AlertMessage />
            <QueryNav name={'page'} />
            <Routes>
                <Route path={BASE_URL} element={<Main/>}/>
                <Route path={BASE_URL + 'task/new'} element={<Suspense fallback={<PageLoader/>}><NewTaskLazy/></Suspense>}/>
                <Route path={BASE_URL + 'task/:taskID'} element={<Suspense fallback={<PageLoader/>}><TaskDetailsLazy/></Suspense>}/>
                <Route path={BASE_URL + 'task/:taskID/:companyID'} element={<Suspense fallback={<PageLoader/>}><CompanyPageLazy/></Suspense>}/>
                <Route path={BASE_URL + 'task/:taskID/edite'} element={<Suspense fallback={<PageLoader/>}><TaskEditePageLazy/></Suspense>}/>
                <Route path={BASE_URL + 'test'} element={<Suspense fallback={<PageLoader/>}><TestPageLazy/></Suspense>}/>
                <Route path={'*'} element={<Navigate to={BASE_URL}/>}/>
            </Routes>
        </>
    )
}

export default App;
