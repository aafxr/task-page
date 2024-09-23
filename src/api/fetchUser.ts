import {bitrix} from "../bitrix";

export async function fetchUser(id: string){
    bitrix.callMethod('user.get', {ID: id}, )
}