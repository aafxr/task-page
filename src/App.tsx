import './css/App.css';
import {Task} from "./classes/Task";
import {TaskComponent} from "./components/TaskComponent";
import {dateFormatter} from "./utils/dateFormatter";
import {Calendar} from "./components/Calendar/Calendar";
import {Container} from "./components/Container";


const tasks = [
    new Task({
        title: 'задача 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque error expedita illum iusto magni minus modi molestiae neque quisquam sed.',
        deadline: new Date('2024.08.12')
    }),
    new Task({
        title: 'задача 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque error expedita illum iusto magni minus modi molestiae neque quisquam sed.',
        deadline: new Date('2024.08.11')
    }),
]

function App() {
    const selectedDay = new Date()


    return (
        <div className="App">
            <Container>
                <button className='dayBtn'>{dateFormatter.format(selectedDay)}</button>
                <Calendar initDate={selectedDay} onSelect={console.log}/>
                <div className='tasks-list'>
                    {tasks.map(t => (
                        <TaskComponent task={t}/>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default App;
