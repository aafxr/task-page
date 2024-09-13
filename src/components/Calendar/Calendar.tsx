import {HTMLAttributes, useEffect, useMemo, useState} from 'react';
import {calendarBoard} from "../../utils/calendarBoard";
import clsx from "clsx";

type CalendarProps = {
    initDate?: Date,
    onSelect?: (d: Date) => unknown
}


const montFormatter = new Intl.DateTimeFormat(navigator.language, {month: "long"})


export function Calendar({initDate, onSelect}: CalendarProps) {
    const [day, setDay] = useState(new Date())
    const [ptr, setPtr] = useState(new Date())
    const board = useMemo(() => calendarBoard(ptr), [ptr])

    const sameMonth = ptr.getMonth() === day.getMonth() && ptr.getFullYear() === day.getFullYear()


    useEffect(() => {
        if (!initDate) return
        setDay(initDate)
        setPtr(initDate)
    }, []);


    function handleDateChange(d: number) {

    }


    return (
        <div className='calendar'>
            <div className='calendar-header'>
                <div className='calendar-arrow calendar-arrow-left'/>
                <div className='calendar-month'>{montFormatter.format(ptr)}</div>
                <div className='calendar-arrow calendar-arrow-right'/>
            </div>
            <div className='calendar-days'>
                {
                    board.map((d, i) => (
                            <CalendarDay
                                day={day}
                                dayVal={d}
                                dayIdx={i}
                                sameMonth={sameMonth}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
}

interface CalendarDayProps extends HTMLAttributes<HTMLDivElement> {
    day: Date
    dayVal: number
    dayIdx: number
    sameMonth: boolean
}

function CalendarDay({day, dayVal, dayIdx, sameMonth, ...props}: CalendarDayProps) {
    const selected = (sameMonth && dayVal === day.getDate())
    const wd = dayIdx % 7
    const weekend = wd === 5 || wd === 6
    const cn = clsx('calendar-day', {selected, weekend})

    return <div
        {...props}
        className={cn}
        data-selected={sameMonth && dayVal === day.getDate()}
    >{dayVal ? dayVal : ''}</div>
}
