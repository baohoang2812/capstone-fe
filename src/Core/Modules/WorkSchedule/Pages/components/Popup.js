/**
 * Popup Component
 */
import React, { useState, useEffect } from 'react';
import './Popup.scss';
// import Button from '@material-ui/core/Button';
import {
    message,
    Button
} from 'antd';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
import workspaceApi from "~/Core/Modules/WorkSchedule/Api/WorkspaceApi";
import shiftApi from "~/Core/Modules/WorkSchedule/Api/ShiftApi";
import workScheduleApi from "~/Core/Modules/WorkSchedule/Api/WorkScheduleApi";
import contactApi from "~/Core/Modules/WorkSchedule/Api";
import moment from "moment";

const Popup = (props) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [state, setState] = useState({
        name: '',
        location: '',
        ...props?.eventRecord?.data
    });
    const [state2, setState2] = useState({
        name: '',
        location: '',
        ...props?.eventRecord?.data
    })

    const t = useTranslate();

    useEffect(() => {
        workspaceApi.getList()
            .then(res => {
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
                        name: item.name,
                        startTime: item.startTime,
                        endTime: item.endTime
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

    const dataChangedLocationHandler = ({ target }) => {
        const nameWorkspace = workspaces.filter(item => item.id === target.value);
        setState({
            ...state,
            name: nameWorkspace?.[0]?.name,
            [target.name]: target.value
        })
    }

    const dataChangedShiftHandler = ({ target }) => {
        const newShift = shifts.filter(item => item.id === target.value)
        const duration = moment.duration(moment(newShift?.[0].endTime, "HH:mm:ss").diff(moment(newShift?.[0].startTime, "HH:mm:ss")));
        const hours = duration.asHours();
        setState({
            ...state,
            duration: hours / 24,
            startDate: moment(state.startDate).format("YYYY-MM-DD") + " " + moment(newShift?.[0].startTime, "HH:mm:ss").format("HH:mm"),
            endDate: moment(state.endDate).format("YYYY-MM-DD") + " " + moment(newShift?.[0].endTime, "HH:mm:ss").format("HH:mm"),
            [target.name]: target.value
        })
    }

    /**
     * Saves the modified form data to the record being edited
     */
    const saveClickHandler = () => {
        if (state.workspaceName === null || state.workspaceName === undefined) {
            message.error('Please select workspace!');
        } else if (state.resourceId === null || state.resourceId === undefined) {
            message.error('Please select employee!');
        }
        else if (state.shiftName === null) {
            message.error('Please select shift!');
        } else {
            const result = {
                shiftId: state.shiftName,
                workDate: moment(new Date(state.startDate)).format("YYYY-MM-DD"),
                workspaceId: state.workspaceName,
                employeeId: state.resourceId
            }
                console.log(state.workScheduleId,"LOg");
            if(state.workScheduleId===null || state.workScheduleId=== undefined){
                workScheduleApi.create(result)
                .then((res) => {
                    if (res.code !== 201) {
                        message.error(t("CORE.task_failure"));
                        return;
                    }
                        message.success(t("CORE.SHIFT.CREATE.SUCCESS"));
                        props.setEventRecordHandler({...state,workScheduleId: res?.data?.workScheduleId});
                        props.closePopup();
                        console.log(state,"LOG Stete");
                })
                .catch(() => {
                    message.error(t("CORE.error.system"));
                });
            }
            else{
                const result2 = {
                    shiftId: state.shiftName,
                    workDate: moment(new Date(state.startDate)).format("YYYY-MM-DD"),
                    workspaceId: state2.workspaceName,
                    employeeId: state2.resourceId,
                    newWorkspaceId:state.workspaceName,
                    newEmployeeId:state.resourceId,
                    workScheduleId:state.workScheduleId
                }
                workScheduleApi.update(result2)
                .then((res) => {
                    if (res.code !== 200) {
                        message.error(t("CORE.task_failure"));
                        return;
                    }
                        message.success(t("CORE.SHIFT.UPDATE.SUCCESS"));
                        props.setEventRecordHandler(state);
                        props.closePopup();
                })
                .catch(() => {
                    message.error(t("CORE.error.system"));
                });
            }
           
        }
    } // saveClickHandler



    const resourceItems = props.resourceStore.map(resource => (
        <MenuItem key={resource.id} value={resource.id}>{resource.name}</MenuItem>
    ));


    const workspaceItems = workspaces.map(resource => (
        <MenuItem key={resource.id} value={resource.id}>{resource.name}</MenuItem>
    ));

    const shiftItems = shifts.map(resource => (
        <MenuItem key={resource.id} value={resource.id}>
            {resource.name}
        ({moment(resource.startTime, "HH:mm:ss").format("HH:mm")} - {moment(resource.endTime, "HH:mm:ss").format("HH:mm")})</MenuItem>
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
                        <InputLabel>{t("CORE.EMPLOYEE.NAME")}</InputLabel>
                        <Select
                            name="resourceId"
                            onChange={dataChangedHandler}
                            value={state.resourceId}
                        >
                            {resourceItems}
                        </Select>
                    </FormControl>
                    <FormControl style={{ marginBottom: 10, width: '100%' }}>
                        <InputLabel>{t("CORE.WORKSPACE.NAME")}</InputLabel>
                        <Select
                            name="workspaceName"
                            onChange={dataChangedLocationHandler}
                            value={state.workspaceName}
                        >
                            {workspaceItems}
                        </Select>
                    </FormControl>

                    <FormControl style={{ marginBottom: 10, width: '100%' }}>
                        <InputLabel>{t("CORE.SHIFT.NAME")}</InputLabel>
                        <Select
                            name="shiftName"
                            onChange={dataChangedShiftHandler}
                            value={state.shiftName}
                        >
                            {shiftItems}
                        </Select>
                    </FormControl>

                    {/* <FormControl style={{ marginBottom: 10, width: '49%', marginLeft: 5 }}>
                        <InputLabel>Công việc</InputLabel>
                        <Select
                            name="eventType"
                            onChange={dataChangedHandler}
                            value={state.eventType}
                        >
                            <MenuItem value="Meeting">Phụ bếp</MenuItem>
                            <MenuItem value="Appointment">Phục vụ</MenuItem>
                        </Select>
                    </FormControl> */}
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
                    {/* <Button variant="contained" color="secondary" onClick={props.closePopup}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={saveClickHandler}>Save</Button> */}


                    <Button
                        type="primary"
                        htmlType="submit"
                        className="btn-yellow btn-right"
                        style={{ float: "right" }}
                        onClick={saveClickHandler}>
                        {t("CORE.VIOLATION.CONFIRM.ACCEPT")}
                    </Button>
                    <Button
                        type="danger"
                        className="btn-yellow btn-left"
                        style={{ float: "right" }}
                        onClick={props.closePopup}>
                        {t("CORE.cancel")}
                    </Button>
                </footer>
            </div>
        </div >
    );
}

export default Popup;

// eof
