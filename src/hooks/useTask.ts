import {useContext, useMemo} from "react";

import {AppContext} from "../context/AppContext";

export function useTask(id = ''){
    const s = useContext(AppContext)
    return useMemo(() => s.tasks.find(t=> t.id === id), [s.tasks, id])
}