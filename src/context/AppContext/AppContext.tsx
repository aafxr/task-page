import React, {createContext, PropsWithChildren, ReactNode, useContext, useState} from 'react';
import {Task} from "../../classes/Task";
import {BXPerson} from "../../classes/BXPerson";


export interface AppContextState {
    user?: BXPerson
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
    tasks: [],
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