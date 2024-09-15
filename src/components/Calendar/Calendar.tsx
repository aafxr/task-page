import {HTMLAttributes, useEffect, useMemo, useState} from 'react';
import {calendarBoard} from "../../utils/calendarBoard";
import clsx from "clsx";

type CalendarProps = {
    date?: Date,
    onSelect?: (d: Date) => unknown
}


const montFormatter = new Intl.DateTimeFormat(navigator.language, {
    month: "long",
    year: "numeric"
})


export function Calendar({date, onSelect}: CalendarProps) {
    const [day, setDay] = useState(new Date())
    const [ptr, setPtr] = useState(new Date())
    const board = useMemo(() => calendarBoard(ptr), [ptr])

    const sameMonth = ptr.getMonth() === day.getMonth() && ptr.getFullYear() === day.getFullYear()


    useEffect(() => {
        if (!date) return
        setDay(date)
        setPtr(date)
    }, [date]);


    function handleDateChange(day: number) {
        const d = new Date(ptr.getFullYear(), ptr.getMonth(), day)
        onSelect?.(d)
    }

    function handleArrowClick(dir: number){
        const d = new Date(ptr)
        d.setMonth(ptr.getMonth() + dir)
        setPtr(d)
    }


    return (
        <div className='calendar'>
            <div className='calendar-header'>
                <div
                    className='calendar-arrow calendar-arrow-left'
                    onClick={() => handleArrowClick(-1)}
                />
                <div className='calendar-month'>{montFormatter.format(ptr)}</div>
                <div
                    className='calendar-arrow calendar-arrow-right'
                    onClick={() => handleArrowClick(1)}
                />
            </div>
            <div className='calendar-days'>
                {
                    board.map((d, i) => (
                            <CalendarDay
                                key={i}
                                day={day}
                                dayVal={d}
                                dayIdx={i}
                                sameMonth={sameMonth}
                                onClick={() => handleDateChange(d)}
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
