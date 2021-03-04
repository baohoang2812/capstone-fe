/**
 *- Implements the top level Main container
 */
// libraries
import React, { useRef, useState, useEffect } from "react";
import { BryntumScheduler } from "bryntum-react-shared";
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
// our stuff
import Header from "../components/Header.js";

// API
import employeeApi from "~/Core/Modules/WorkSchedule/Api/EmployeeApi";
import workScheduleApi from "~/Core/Modules/WorkSchedule/Api/WorkScheduleApi";
import moment from "moment";

const Main = React.forwardRef((props, ref) => {
  const [employees, setEmployees] = useState([]);
  const [workSchedules, setWorkSchedules] = useState([])
  const scheduler = useRef();
  const t = useTranslate();
  useEffect(() => {
    employeeApi.getList()
      .then(res => {
        const listEmployee = res?.data?.result?.map(item => {
          return {
            id: item.id,
            name: `${item.lastName} ${item.firstName}`,
            category: item?.position?.name,
            type: item.isPartTime ? "Full time" : "Part time",
            image: item.imagePath,
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
  return (
    <>
      <Header titleHref="../../../../../examples/#example-examples-scheduler-react-javascript-custom-event-editor" />
      <BryntumScheduler
        ref={ref}
        barMargin={7}
        startDate={startDate()}
        endDate={endDate()}
        events={workSchedules}
        // events={[


        //   {
        //     resourceId: "6",
        //     name: "Ca 1",
        //     startDate: "2017-02-07 11:00",
        //     endDate: "2017-02-07 14:00",
        //     location: "Some office",
        //     eventType: "Meeting",
        //     iconCls: "b-fa b-fa-calendar",
        //   },
        //   {
        //     resourceId: "7",
        //     name: "Ca 2",
        //     startDate: "2017-02-07 12:00",
        //     endDate: "2017-02-07 15:00",
        //     location: "Home office",
        //     eventType: "Meeting",
        //     iconCls: "b-fa b-fa-calendar",
        //   },
        //   {
        //     resourceId: "8",
        //     name: "Ca #3",
        //     startDate: "2017-02-07 13:00",
        //     endDate: "2017-02-07 16:00",
        //     location: "Customer office",
        //     eventType: "Meeting",
        //     iconCls: "b-fa b-fa-calendar",
        //   },
        //   {
        //     resourceId: "9",
        //     name: "Important meeting",
        //     startDate: "2017-02-07 09:00",
        //     endDate: "2017-02-07 11:00",
        //     location: "Some office",
        //     eventType: "Meeting",
        //     eventColor: "red",
        //     iconCls: "b-fa b-fa-exclamation-triangle",
        //   },
        //   {
        //     resourceId: "10",
        //     name: "Ca #1",
        //     startDate: "2017-02-07 10:00",
        //     endDate: "2017-02-07 12:00",
        //     location: "Home office",
        //     type: "Dental",
        //     eventType: "Appointment",
        //     iconCls: "b-fa b-fa-calendar-alt",
        //   },
        //   {
        //     resourceId: "11",
        //     name: "Appointment #2",
        //     startDate: "2017-02-07 11:00",
        //     endDate: "2017-02-07 13:00",
        //     location: "Customer office",
        //     type: "Medical",
        //     eventType: "Appointment",
        //     iconCls: "b-fa b-fa-calendar-alt",
        //   },
        //   {
        //     resourceId: "13",
        //     name: "Appointment #3",
        //     startDate: "2020-02-07 10:00",
        //     endDate: "2017-02-07 12:00",
        //     location: "Home office",
        //     type: "Medical",
        //     eventType: "Appointment",
        //     iconCls: "b-fa b-fa-calendar-alt",
        //   },
        //   {
        //     resourceId: "12",
        //     name: "Important appointment",
        //     startDate: "2020-02-07 15:00",
        //     endDate: "2017-02-07 18:00",
        //     location: "Customer office",
        //     type: "Dental",
        //     eventType: "Appointment",
        //     eventColor: "red",
        //     iconCls: "b-fa b-fa-exclamation-triangle",
        //   },
        // ]}
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
            text: "Staff",
            width: 180,
          },
          {
            text: "Type",
            field: "category",
            width: 100,
          },
        ]}
      />{" "}
      {/* eo BryntumScheduler */}
    </>
  );
}) // eo class Main

export default Main;

// eof
