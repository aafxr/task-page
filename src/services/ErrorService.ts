import {AppContextState} from "../context/AppContext";
import {errors} from "../errors";
import {ReactNode} from "react";
import {AuthMessage} from "../components/AuthMessage";
import axios from "axios";
import {BASE_URL} from "../App";
import {dispatchAlert} from "../components/AlertMessage";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

/**
 * преобразует сообщение  об ошибке в читаемое сообщение
 * @param errorMessage
 */
function errorMessageToReadableMessage(errorMessage: string): {node: ReactNode, code: number} {

    if(errorMessage.startsWith('timeout')){
        return {node: 'Медленное интернет соединение. Попробуйте повторить запрос', code: 0}
    }

    switch (errorMessage) {
        case errors.BX_EXPIRED_TOKEN:
        case errors.UNAUTHORIZED:
        case errors.PERMISSION_DENIED:
            return {node: AuthMessage(), code: 401}
        case errors.BX_PAYMENT_REQUIRED:
            return {node: 'Приложение временно не достсупно', code: 500}
        case errors.BX_INSUFFICIENT_SCOPE:
            return {node: 'Недостаточно прав', code: 403}
        case errors.NETWORK_ERROR:
            return {node: 'Проблемы с интернетом, попробуйте повторить запрос', code: 0}
        default:
            return {node: errorMessage, code: 500}
    }
}


export class ErrorService {
    static handleError(ctx: AppContextState) {
        return (e: Error) => {
            // handle error here ...
            const isUnauthorized = e.message === errors.UNAUTHORIZED
            const log: any = {
                name: e.name,
                message: e.message,
                stack: e.stack
            }
            if (isUnauthorized && Telegram.WebApp.initDataUnsafe.user) log.telegram = Telegram.WebApp.initDataUnsafe.user
            axios.post(BASE_URL + 'api/log/', log).catch(console.error)
            dispatchAlert(e.message)


            const err = errorMessageToReadableMessage(e.message)

            ctx.updateAppContext(s => {
                const newState = {...s, error: err.node, errorCode: err.code}
                if(isUnauthorized) newState.loggedIn = false
                return newState
            })
            console.error('[ErrorService] ', e)
        }
    }
}