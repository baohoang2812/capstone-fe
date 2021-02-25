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
import Popup from './components/Popup';

function App() {

    const [popupShown, showPopup] = useState(false),
          [eventRecord, setEventRecord] = useState(null),
          [eventStore, setEventStore] = useState(null),
          [resourceStore, setResourceStore] = useState(null),
          main = useRef()
    ;

    const showEditor = (eventRecord) => {
        const { eventStore, resourceStore } = main.current.refs.scheduler.schedulerInstance;
        setEventStore(eventStore);
        setResourceStore(resourceStore);
        setEventRecord(eventRecord);
        showPopup(true);
    }

    const hideEditor = () => {
        setEventRecord(null);
        showPopup(false)
    }

    return (
        <>
            <Main showEditor={showEditor} ref={main} />
            <div>
                { popupShown ?
                    <Popup
                        text="Popup text"
                        closePopup={hideEditor}
                        eventRecord={eventRecord}
                        eventStore={eventStore}
                        resourceStore={resourceStore}
                    ></Popup> :
                null}
            </div>
        </>
    );
}

export default App;

// eof
