import './css/App.css';
import {Task} from "./classes/Task";
import {TaskComponent} from "./components/TaskComponent";
import {dateFormatter} from "./utils/dateFormatter";
import {Calendar} from "./components/Calendar/Calendar";
import {Container} from "./components/Container";
import {useState} from "react";


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
    const [selectedDay, setSelectedDay] = useState(new Date())


    return (
        <div className="App">
            <Container>
                <button className='dayBtn'>{dateFormatter.format(selectedDay)}</button>
                <Calendar date={selectedDay} onSelect={setSelectedDay}/>
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
