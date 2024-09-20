import {TasksComponent} from "../../components/TasksComponent";
import {dateFormatter} from "../../utils/dateFormatter";
import {useAppContext} from "../../context/AppContext";
import {Container} from "../../components/Container";
import {Calendar} from "../../components/Calendar";
import {Modal} from "../../components/Moadl";

export function Main() {
    const s = useAppContext()


    function handleChangeSelectedDay(d: Date) {
        s.updateAppContext(({...s, selectedDay: d, openCalendar: false}))
    }


    function handleToggleCalendar() {
        s.updateAppContext(({...s, openCalendar: !s.openCalendar}))
    }


    return (
        <div>
            <Container>
                <div>
                    <button className='dayBtn' onClick={handleToggleCalendar}>{dateFormatter.format(s.selectedDay)}</button>
                </div>
                {!!s.error && (
                    <div className='app-error'>
                        <p>{s.error.message}</p>
                    </div>
                )}
                <Modal
                    className='calendar-modal'
                    open={s.openCalendar}
                    onClose={handleToggleCalendar}
                >
                    <Calendar date={s.selectedDay} onSelect={handleChangeSelectedDay}/>
                </Modal>
                <TasksComponent />
            </Container>
        </div>
    );
}

