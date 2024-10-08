import React, {createContext, PropsWithChildren, ReactNode, useContext, useState} from 'react';
import {Task} from "../../classes/Task";
import {BXPerson} from "../../classes/BXPerson";



const tasks = [
    new Task({
        id: '1',
        title: 'задача 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque error expedita illum iusto magni minus modi molestiae neque quisquam sed.',
        deadline: new Date('2024.08.12'),
        createdDate: new Date(),
        changedDate: new Date('2024.9.20')
    }),
    new Task({
        id: '2',
        title: 'задача 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque error expedita illum iusto magni minus modi molestiae neque quisquam sed.',
        deadline: new Date('2024.08.11'),
        closedDate: new Date('2024.08.10'),
        createdDate: new Date(),
        changedDate: new Date('2024.9.20')
    }),
    new Task({
        id: '3',
        title: 'задача 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque error expedita illum iusto magni minus modi molestiae neque quisquam sed.',
        deadline: new Date('2024.08.11'),
        createdDate: new Date(),
        changedDate: new Date('2024.9.20')
    }),
]




export interface AppContextState {
    loggedIn?: boolean
    openCalendar: boolean
    selectedDay: Date
    tasks: Task[]
    tasksLoading: boolean
    error: ReactNode | null
    errorCode: number | null
    selectedTask: Task | null
    persons: BXPerson[],
    personsMap: Map<string, BXPerson>

    report?: {
        reportTask: Task
        nextTask?: Task
        files: Record<string, boolean>
    }

    reportSending: boolean


    updateAppContext: React.Dispatch<React.SetStateAction<AppContextState>>
}


const defaultState: AppContextState = {
    loggedIn: undefined,
    openCalendar: false,
    selectedDay: new Date(),
    tasksLoading: false,
    tasks: window.location.origin.includes('localhost') ? tasks : [],
    error: null,
    errorCode: null,
    selectedTask: null,
    updateAppContext: () => {},
    persons: [],
    personsMap: new Map(),
    reportSending: false
}


export const AppContext = createContext(defaultState)


export function AppContextProvider({children}: PropsWithChildren) {
    const [s, setState] = useState(defaultState)


    s.updateAppContext = setState

    // @ts-ignore
    window.ctx = s


    return (
        <AppContext.Provider value={s}>
            {children}
        </AppContext.Provider>
    );
}


export function useAppContext(){
    return useContext(AppContext)
}