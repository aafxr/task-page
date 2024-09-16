import './css/App.css';
import {useEffect, useState} from "react";

import {TaskComponent} from "./components/TaskComponent";
import {dateFormatter} from "./utils/dateFormatter";
import {Container} from "./components/Container";
import {Calendar} from "./components/Calendar";
import {Loader} from "./components/Loader";
import {Modal} from "./components/Moadl";
import {TaskService} from "./services";
import {Task} from "./classes/Task";
import {Button} from "./components/Button";


const tasks = [
    new Task({
        id: '1',
        title: 'задача 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque error expedita illum iusto magni minus modi molestiae neque quisquam sed.',
        deadline: new Date('2024.08.12')
    }),
    new Task({
        id: '2',
        title: 'задача 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque error expedita illum iusto magni minus modi molestiae neque quisquam sed.',
        deadline: new Date('2024.08.11'),
        closedDate: new Date('2024.08.10')
    }),
]


type AppState = {
    openCalendar: boolean
    selectedDay: Date
    tasks: Task[]
    tasksLoading: boolean
    error: Error | null
}


const defaultState: AppState = {
    openCalendar: false,
    selectedDay: new Date(),
    tasksLoading: false,
    tasks: tasks,
    error: null
}

function App() {
    const [s, setState] = useState(defaultState)


    useEffect(() => {
        setState(p => ({...p, /*tasks: [], */ tasksLoading: true}))
        TaskService.getTasks(s.selectedDay)
            .then(tl => setState(p => ({...p, tasks: tl, tasksLoading: false})))
            .catch(e => setState(p => ({...p, tasksLoading: false, error: e})))
    }, [s.selectedDay]);


    function handleChangeSelectedDay(d: Date) {
        setState(p => ({...p, selectedDay: d, openCalendar: false}))
    }


    function handleToggleCalendar() {
        setState(p => ({...p, openCalendar: !p.openCalendar}))
    }


    return (
        <div className="App">
            <Container>
                <button className='dayBtn' onClick={handleToggleCalendar}>{dateFormatter.format(s.selectedDay)}</button>
                {!!s.error && (
                    <div className='app-error'>
                        <p>{s.error.message}</p>
                    </div>
                )}
                <Modal open={s.openCalendar} onClose={handleToggleCalendar}>
                    <Calendar date={s.selectedDay} onSelect={handleChangeSelectedDay}/>
                </Modal>

                {s.tasksLoading
                    ? <Loader/>
                    : (
                        <div className='tasks-list'>
                            {s.tasks.map(t => (
                                <TaskComponent key={t.id} task={t}/>
                            ))}
                        </div>
                    )
                }
            </Container>
        </div>
    );
}

export default App;
