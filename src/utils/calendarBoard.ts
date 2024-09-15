import {monthDays} from "./monthDays";
import {firstMonthDayOffset} from "./firstMonthDayOffset";

export function calendarBoard(d: Date){
    const days = monthDays(d)
    const offset = firstMonthDayOffset(d)
    let total = 42
    const rest = 7 - total % 7
    if (rest !== 7) total += rest

    const board = new Array<number>(total).fill(0)
    let day  = 1
    for(let i = offset; i < offset + days; i++){
        board[i] = day
        day ++
    }

    return board
}