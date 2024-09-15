import {Task} from "../classes/Task";
import {fetchTasks} from "../api";

export class TasksService {
    static async getTasks(d: Date): Promise<Task[]> {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const formattedStartDate = startOfDay.toISOString().split('T')[0];
        const formattedEndDate = endOfDay.toISOString().split('T')[0];

        const filter = {
            filter: {
                DEADLINE: { '>=': formattedStartDate, '<=': formattedEndDate }
            },
        }

        const tasks = await fetchTasks(filter)
        return tasks.map(t => new Task(t));
    }
}