/**
 * возвращает смещение начала месяца относительно недели
 *
 * (смещение от начала недели первого дня месяца)
 *
 * @param d
 */
export function firstMonthDayOffset(d: Date){
    const t = new Date(d.getFullYear(), d.getMonth(),1)
    let offset = t.getDay()
    if(offset === 0) offset = 7
    return offset - 1
}