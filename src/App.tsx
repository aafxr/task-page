import './css/App.css';
import {Task} from "./classes/Task";
import {TaskComponent} from "./components/TaskComponent";
import {dateFormatter} from "./utils/dateFormatter";
import {Calendar} from "./components/Calendar/Calendar";
import {Container} from "./components/Container";


const tasks = [
    new Task({
        title: 'задача 1',
        description: 'описание',
        deadline: new Date('2024.08.12')
    }),
    new Task({
        title: 'задача 2',
        description: 'описание',
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
                {tasks.map(t => (
                    <TaskComponent task={t}/>
                ))}
            </Container>
        </div>
    );
}

export default App;
