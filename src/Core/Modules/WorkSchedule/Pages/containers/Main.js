/**
 *- Implements the top level Main container
 */
// libraries
import React, {useState, useEffect } from "react";
import { BryntumScheduler } from "bryntum-react-shared";
// our stuff
import Header from "../components/Header.js";

// API
import employeeApi from "~/Core/Modules/WorkSchedule/Api/EmployeeApi";
import workScheduleApi from "~/Core/Modules/WorkSchedule/Api/WorkScheduleApi";
import moment from "moment";

const Main = React.forwardRef((props, ref) => {
  const [employees, setEmployees] = useState([]);
  const [workSchedules, setWorkSchedules] = useState([])
  useEffect(() => {
    employeeApi.getList()
      .then(res => {
        const listEmployee = res?.data?.result?.map(item => {
          return {
            id: item.id,
            name: `${item.lastName} ${item.firstName}`,
            category: item?.position?.name,
            type: item.isPartTime ? "Full time" : "Part time",
            imageUrl: item.imagePath,
          }
        })

        setEmployees(listEmployee);
      });

    workScheduleApi.getList()
      .then(res => {
        const listWorkSchedule = res?.data?.result?.map(item => {
          return {
            resourceId: item?.employee?.id,
            name: item?.workspace?.name,
            workspaceName: item?.workspace?.id,
            startDate: moment(item?.workSchedule?.workDate).format("YYYY-MM-DD")+" "+ moment(item?.workSchedule?.shift?.startTime, "HH:mm:ss").format("HH:mm"),
            endDate: moment(item?.workSchedule?.workDate).format("YYYY-MM-DD")+" "+ moment(item?.workSchedule?.shift?.endTime, "HH:mm:ss").format("HH:mm"),
            location: "Some office",
            eventType: "Meeting",
            iconCls: "b-fa b-fa-calendar",
            shiftName: item?.workSchedule?.shift?.id
          }
        })
        setWorkSchedules(listWorkSchedule);
      })

  }, [])
  const startDate = () => {
    const start = new Date();
    start.setHours(8, 0, 0, 0);
    return start
  }
  const endDate = () => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return end
  }
  console.log(employees)
  return (
    <>
      <Header titleHref="../../../../../examples/#example-examples-scheduler-react-javascript-custom-event-editor" />
      <BryntumScheduler
        ref={ref}
        barMargin={7}
        startDate={startDate()}
        endDate={endDate()}
        events={workSchedules}
        resources={employees}
        listeners={{
          beforeEventEdit: (source) => {
            source.eventRecord.resourceId = source.resourceRecord.id;
            props.showEditor(source.eventRecord);
            return false;
          },
        }}
        resourceImagePath="users/"
        // Columns in scheduler
        columns={[
          {
            type: "resourceInfo",
            text: "Nhân viên",
            width: 180,
          },
          {
            text: "Chức vụ",
            field: "category",
            width: 120,
          },
        ]}
      />{" "}
      {/* eo BryntumScheduler */}
    </>
  );
}) // eo class Main

export default Main;

// eof
