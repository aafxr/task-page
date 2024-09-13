/**
 * возвращает количество дней в месяце для переданного дня
 * @param d
 */
export function monthDays(d: Date){
    const t = new Date(d.getFullYear(), d.getMonth()+1, 0);
    return t.getDate();
}