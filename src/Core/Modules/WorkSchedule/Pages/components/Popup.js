/**
 * Popup Component
 */
import React, { useState, useEffect } from 'react';
import './Popup.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { message } from 'antd';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
import DateFnsUtils from '@date-io/date-fns';
import workspaceApi from "~/Core/Modules/WorkSchedule/Api/WorkspaceApi";
import shiftApi from "~/Core/Modules/WorkSchedule/Api/ShiftApi";



import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';
import contactApi from "~/Core/Modules/WorkSchedule/Api/EmployeeApi";

const Popup = (props) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [state, setState] = useState({
        name: '',
        eventType: 'Meeting',
        location: '',
        ...props.eventRecord.data
    });
    console.log(state);

    const t = useTranslate();

    useEffect(() => {
        workspaceApi.getList()
            .then(res => {
                console.log(res.data);
                const listWorkspace = res?.data?.result?.map(item => {
                    return {
                        id: item.id,
                        name: item.name

                    }
                })

                setWorkspaces(listWorkspace);
            });

        shiftApi.getList()
            .then(res => {
                const listShift = res?.data?.result?.map(item => {
                    return {
                        id: item.id,
                        name: item.name
                    }
                })
                setShifts(listShift);

            })


    }, [])

    /**
     * Sets the changed value to state
     * @param {HTMLElement} target The input that changed
     */
    const dataChangedHandler = ({ target }) => {
        setState({
            ...state,
            [target.name]: target.value
        });
    } // eo function dataChangedHandler

    /**
     * Updates state with startDate
     * @param {Date} startDate
     */
    const startDateChangeHandler = (startDate) => {
        setState({
            ...state,
            startDate: startDate
        })
    } // eo startDateChangeHandler

    /**
     * Updates state with endDate
     * @param {Date} endDate
     */
    const endDateChangeHandler = (endDate) => {
        setState({
            ...state,
            endDate: endDate
        });
    } // eo function endDateChangeHandler

    /**
     * Saves the modified form data to the record being edited
     */
    const saveClickHandler = () => {


        console.log(state.workspaceName)
        if (state.workspaceName === null || state.workspaceName === undefined) {
            message.error('Please select workspace!');
        } else if (state.resourceId === null || state.resourceId === undefined) {
            message.error('Please select employee!');
        }
        else if (state.shiftName === null) {
            message.error('Please select shift!');
        } else {
            const eventRecord = props.eventRecord;
            message.success('Created success!');
            eventRecord.set({ ...state });

            if (!eventRecord.eventStore) {
                props.eventStore.add(eventRecord);
            }

            props.closePopup();
        }



    } // saveClickHandler



    const resourceItems = props.resourceStore.map(resource => (
        <MenuItem key={resource.id} value={resource.id}>{resource.name}</MenuItem>
    ));


    const workspaceItems = workspaces.map(resource => (
        <MenuItem key={resource.id} value={resource.id}>{resource.name}</MenuItem>
    ));

    const shiftItems = shifts.map(resource => (
        <MenuItem key={resource.id} value={resource.id}>{resource.name}</MenuItem>
    ));


    return (
        <div className='popup-mask'>
            <div className='popup'>
                <header style={{
                    fontSize: "1em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    background: "#fff5e6",
                    padding: "0.5em",
                    borderBottom: "solid 1px #feac31"
                }}>
                    {t("CORE.WORKSCHEDULE.CREATE")}
                    &nbsp;</header>
                <article>

                    <FormControl style={{ marginBottom: 10, width: '100%' }}>
                        <InputLabel>{t("CORE.WORKSPACE.NAME")}</InputLabel>
                        <Select
                            name="workspaceName"
                            onChange={dataChangedHandler}
                            value={state.workspaceName}
                        >
                            {workspaceItems}
                        </Select>
                    </FormControl>
                    <FormControl style={{ marginBottom: 10, width: '100%' }}>
                        <InputLabel>Staff</InputLabel>
                        <Select
                            name="resourceId"
                            onChange={dataChangedHandler}
                            value={state.resourceId}
                        >
                            {resourceItems}
                        </Select>
                    </FormControl>
                    <FormControl style={{ marginBottom: 10, width: '100%' }}>
                        <InputLabel>{t("CORE.SHIFT.NAME")}</InputLabel>
                        <Select
                            name="shiftName"
                            onChange={dataChangedHandler}
                            value={state.shiftName}
                        >
                            {shiftItems}
                        </Select>
                    </FormControl>

                    <FormControl style={{ marginBottom: 10, width: '49%', marginLeft: 5 }}>
                        <InputLabel>Event type</InputLabel>
                        <Select
                            name="eventType"
                            onChange={dataChangedHandler}
                            value={state.eventType}
                        >
                            <MenuItem value="Meeting">Meeting</MenuItem>
                            <MenuItem value="Appointment">Appointment</MenuItem>
                        </Select>
                    </FormControl>
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                                name="startDate"
                                label="Start"
                                ampm={false}
                                format="yyyy-MM-dd HH:mm"
                                style={{ width : '49%', marginRight : 5 }}
                                value={state.startDate}
                                onChange={startDateChangeHandler}
                            ></KeyboardDateTimePicker>
                            <KeyboardDateTimePicker
                                name="endDate"
                                label="End"
                                ampm={false}
                                format="yyyy-MM-dd HH:mm"
                                style={{ width : '49%', marginLeft : 5 }}
                                value={state.endDate}
                                onChange={endDateChangeHandler}
                            ></KeyboardDateTimePicker>
                        </MuiPickersUtilsProvider> */}
                </article>
                <footer>
                    <Button variant="contained" color="secondary" onClick={props.closePopup}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={saveClickHandler}>Save</Button>
                </footer>
            </div>
        </div >
    );
}

export default Popup;

// eof
