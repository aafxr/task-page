import './css/App.css';
import {Task} from "./classes/Task";
import {TaskComponent} from "./components/TaskComponent";
import {dateFormatter} from "./utils/dateFormatter";
import {Calendar} from "./components/Calendar/Calendar";
import {Container} from "./components/Container";
import {useEffect, useState} from "react";
import {Modal} from "./components/Moadl";


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
        deadline: new Date('2024.08.11')
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
    tasks: [],
    error: new Error('message')
}

function App() {
    const [s, setState] = useState(defaultState)


    useEffect(() => {
        setState({...s, tasks})
    }, []);


    function handleChangeSelectedDay(d: Date) {
        setState(p => ({...p, selectedDay: d, openCalendar: false}))
    }


    function handleToggleCalendar() {
        setState(p => ({...p, openCalendar: !p.openCalendar}))
    }


    console.log(s)

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
                <div className='tasks-list'>
                    {s.tasks.map(t => (
                        <TaskComponent key={t.id} task={t}/>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default App;
