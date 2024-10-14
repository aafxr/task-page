import {TaskFilter, TasksComponent} from "../../components/TasksComponent";
import {dateFormatter} from "../../utils/dateFormatter";
import {useAppContext} from "../../context/AppContext";
import {Container} from "../../components/Container";
import {Calendar} from "../../components/Calendar";
import {Modal} from "../../components/Moadl";
import {ErrorMessageComponent} from "../../components/ErrorMessageComponent";
import {Button} from "../../components/Button";
import React, {ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import {Block} from "../../components/Block";
import {PlusIcon} from "../../components/svg";
import {Text} from "../../components/Text";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../../App";



type FilterType = {
    title: string
    filter: TaskFilter
}

const filters : FilterType[] = [
    {
        filter: "all",
        title: 'Все'
    },
    {
        filter: "no-closed",
        title: 'Открытые'
    },
    {
        filter: "expired",
        title: 'Просроченные'
    },
    {
        filter: "closed",
        title: 'Закрытые'
    },
]




export function Main() {
    const navigate = useNavigate()
    const s = useAppContext()
    const [f, setFilter] = useState(filters[0])
    // const [delay, setDelay] = useState(false)


    const today = useMemo(() => {
        const d = s.selectedDay
        const dateStart = new Date()
        dateStart.setHours(0,0,0,0)
        const dateEnd = new Date()
        dateEnd.setHours(23,59,59,999)
        return d.valueOf() >= dateStart.valueOf() && d.valueOf() < dateEnd.valueOf()
    }, [s.selectedDay])


    useEffect(() => {
        if (!today) setFilter(filters[0])
    }, [today]);


    function handleChangeSelectedDay(d: Date) {
        s.updateAppContext(({...s, selectedDay: d, openCalendar: false}))
    }


    function handleToggleCalendar() {
        s.updateAppContext(({...s, openCalendar: !s.openCalendar}))
    }


    function handleResetError(){
        if(s.errorCode !== 401){
            s.updateAppContext(p => ({...p, error: null, errorCode: null}))
        }
    }


    function handleAddTask(){
        navigate(`${BASE_URL}task/new`)
    }


    return (
        <div className='wrapper'>
            <div className='wrapper-header'>
                <div className='mainPage-filter'>
                    <Button onClick={handleToggleCalendar}>{dateFormatter.format(s.selectedDay)}</Button>
                    {today && filters.map(e =>
                        <Button
                            key={e.filter}
                            className={e=== f ? 'active-btn' : ''}
                            onClick={() => setFilter(e)}
                        >{e.title}</Button>
                    )}
                </div>
                <Container style={{paddingBottom: 'var(--padding)'}}>
                    {!!s.error && (
                        <ErrorMessageComponent onClose={handleResetError}>
                            {s.error}
                        </ErrorMessageComponent>
                    )}
                    <Modal
                        className='calendar-modal'
                        open={s.openCalendar}
                        onClose={handleToggleCalendar}
                    >
                        <Calendar date={s.selectedDay} onSelect={handleChangeSelectedDay}/>
                    </Modal>
                </Container>
            </div>
            <div className='wrapper-content'>
                <Container >
                    {
                        <Block className='addTask' onClick={handleAddTask}>
                            <PlusIcon className='icon'/>
                            <Text>добавить задачу</Text>
                        </Block>
                    }
                    <TasksComponent filter={f.filter}/>
                </Container>
            </div>
            <div className='wrapper-footer'>
            </div>
        </div>
    );
}

