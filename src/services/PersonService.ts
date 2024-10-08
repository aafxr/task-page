import {AppContextState} from "../context/AppContext";
import {ErrorService} from "./ErrorService";
import {IBXSuccessResponse} from "../bitrix/@types";
import {fetchUsers} from "../api";
import {BXPerson} from "../classes/BXPerson";

let persons:BXPerson[] = []
const map = new Map<string, BXPerson>()

export class PersonService{
    static async byID(ctx: AppContextState, personID: string){

    }

    static getList(ctx: AppContextState){
        (async () => {
            try {
                if(persons.length) return persons

                let request: any = {}
                // загрузка всех задач
                let next = 0
                let res:  IBXSuccessResponse<BXPerson[]>

                do {
                    request.start = next
                    res = await fetchUsers(request)
                    next = res.next
                    persons = persons.concat(res.result.map(p => new BXPerson(p)))
                }while(next < res.total)

                persons = persons.map(p => new BXPerson(p))
                persons.sort((a,b) => a.LAST_NAME < b.LAST_NAME ? -1 : a.LAST_NAME > b.LAST_NAME ? 1 : 0)
                persons.forEach(p => map.set(p.ID, p))
                ctx.updateAppContext(s => ({...s, personsMap: map, persons}))

            } catch (e) {
                ErrorService.handleError(ctx)(e as Error)
            }
        })()
    }
}