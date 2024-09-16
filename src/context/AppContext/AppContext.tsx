import React, {createContext, PropsWithChildren, useContext, useState} from 'react';
import {Task} from "../../classes/Task";



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


export interface AppContextState {
    openCalendar: boolean
    selectedDay: Date
    tasks: Task[]
    tasksLoading: boolean
    error: Error | null
    selectedTask: Task | null


    updateAppContext: React.Dispatch<React.SetStateAction<AppContextState>>
}


const defaultState: AppContextState = {
    openCalendar: false,
    selectedDay: new Date(),
    tasksLoading: false,
    tasks: tasks,
    error: null,
    selectedTask: null,
    updateAppContext: () => {}
}


export const AppContext = createContext(defaultState)


export function AppContextProvider({children}: PropsWithChildren) {
    const [s, setState] = useState(defaultState)


    s.updateAppContext = setState


    return (
        <AppContext.Provider value={s}>
            {children}
        </AppContext.Provider>
    );
}


export function useAppContext(){
    return useContext(AppContext)
}