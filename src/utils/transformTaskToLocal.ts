import {BxField, Task} from "../classes/Task";

const keysToLocalMap = new Map<string, string>()
Object.entries(BxField).forEach(([k,v]) => keysToLocalMap.set(v,k))


export function transformTaskToLocal(t: Task): Task{
    const res: any = {}
    Object.keys(t).forEach(k => {
        const tk = keysToLocalMap.get(k)
        //@ts-ignore
        if(tk) res[tk] = t[k]
    })
    return res
}