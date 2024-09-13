import './App.css';
import {Task} from "./classes/Task";
import {TaskComponent} from "./components/TaskComponent";


const tasks = [
    new Task({
        deadline: new Date('2024.08.12')
    }),
    new Task({
        deadline: new Date('2024.08.11')
    }),
]

function App() {


  return (
    <div className="App">
        {tasks.map(t => (
            <TaskComponent task={t} />
        ))}
    </div>
  );
}

export default App;
