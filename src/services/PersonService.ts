import {AppContextState} from "../context/AppContext";
import {ErrorService} from "./ErrorService";
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
                persons = await fetchUsers()
                persons.sort((a,b) => a.LAST_NAME < b.LAST_NAME ? -1 : a.LAST_NAME > b.LAST_NAME ? 1 : 0)
                persons.forEach(p => map.set(p.ID, p))
                ctx.updateAppContext(s => ({...s, personsMap: map, persons}))

            } catch (e) {
                ErrorService.handleError(ctx)(e as Error)
            }
        })()
    }
}