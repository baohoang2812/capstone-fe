/**
 *- Application file
 */
// libraries
import React, { useState, useRef } from 'react';

// our stuff
import './App.scss';
import 'bryntum-schedulerpro/schedulerpro.stockholm.css';
import 'bryntum-react-shared/resources/shared.scss';
import Main from './containers/Main';
// import Scheduler from "bryntum-schedulerpro"
import Popup from './components/Popup';

const Schedule = () => {

    const [popupShown, showPopup] = useState(false),
        [eventRecord, setEventRecord] = useState(null),
        [eventStore, setEventStore] = useState(null),
        [resourceStore, setResourceStore] = useState(null),
        main = useRef()
        ;

    const showEditor = (eventRecord) => {
        const { eventStore, resourceStore } = main.current.schedulerInstance;
      
        setEventStore(eventStore);
        setResourceStore(resourceStore);
        setEventRecord(eventRecord);
        showPopup(true);
       
    }

    const removeRevordHandler = (state) => {
        const { selectedEvents } = main.current.schedulerInstance;
        selectedEvents[0].remove()
    }
    // const scheduler = new Scheduler({
    //     features : {
    //         columnLines : false,
    //         eventResize : false
    //     }
    // });
   

    const setEventRecordHandler = (state) => {
        eventRecord.set({ ...state });
        if (!eventRecord.eventStore) {
            eventStore.add(eventRecord);
            setEventRecord(eventRecord);
            setEventStore(eventStore);
        }

    }

    const hideEditor = () => {
        setEventRecord(null);
        showPopup(false)
    }
   

    return (
        <>
            <Main  showEditor={showEditor} ref ={main} />
            <div>
                {popupShown ?
                    <Popup
                        text="Popup text"
                        closePopup={hideEditor}
                        eventRecord={eventRecord}
                        eventStore={eventStore}
                        resourceStore={resourceStore}
                        setEventRecordHandler={setEventRecordHandler}
                        removeRevordHandler={removeRevordHandler}
                    ></Popup> :
                    null}
            </div>
        </>
    );
}

export default Schedule;

// eof
