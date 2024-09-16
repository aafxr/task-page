import {Task} from "../classes/Task";
import {fetchTasks} from "../api";
import {AppContextState} from "../context/AppContext";

export class TaskService {
    /**
     * список задач на дату
     * @param ctx
     */
    static async getTasks(ctx: AppContextState): Promise<Task[]> {
        ctx.updateAppContext(({...ctx, /*tasks: [], */ tasksLoading: true}))

        const today = new Date(ctx.selectedDay);
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const formattedStartDate = startOfDay.toISOString().split('T')[0];
        const formattedEndDate = endOfDay.toISOString().split('T')[0];

        const filter = {
            filter: {
                DEADLINE: { '>=': formattedStartDate, '<=': formattedEndDate },
                REAL_STATUS: {'<': 5}
            },
        }

        const tasks = await fetchTasks(filter)
        return tasks.map(t => new Task(t));
    }



    /**
     * Метод переводит задачу в статус «выполняется».
     * @param ctx
     * @param task
     */
    static async start(ctx: AppContextState, task: Task){

    }

    /**
     * Метод переводит задачу в статус «завершена».
     * @param ctx
     * @param task
     */
    static async complete(ctx: AppContextState, task: Task){

    }

    /**
     * Метод обновляет задачу.
     * @param ctx
     * @param task
     */
    static async update(ctx: AppContextState, task: Task){

    }



}