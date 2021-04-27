/**
 *- Implements the top level Main container
 */
import "./style.less";
// libraries
import React, { useState, useEffect } from "react";
import { BryntumScheduler } from "bryntum-react-shared";
// our stuff
import Header from "../components/Header.js";

// API
import employeeApi from "~/Core/Modules/WorkSchedule/Api/EmployeeApi";
import workScheduleApi from "~/Core/Modules/WorkSchedule/Api/WorkScheduleApi";
import moment from "moment";

import { Card, Drawer, DatePicker } from "antd";
import ImageThumbnail from "~/Core/Components/common/ImageThumbnail";
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
import Table from "~/Core/Modules/WorkSchedule/Components/Table/TableRequest";
import jwt_decode from "jwt-decode";

const { Meta } = Card;
const { WeekPicker } = DatePicker;
const yearNumber = 2021;

const serialize = (obj) => {
  if (obj && obj !== {}) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return `${str.join("&")}`;
  }
  return "";
};

// eslint-disable-next-line no-extend-native
Date.prototype.getWeek = function (start) {
  //Calcing the starting point
  start = start || 0;
  var today = new Date(this.setHours(0, 0, 0, 0));
  var day = today.getDay() - start;
  var date = today.getDate() - day;

  // Grabbing Start/End Dates
  var StartDate = new Date(today.setDate(date));
  var EndDate = new Date(today.setDate(date + 6));

  const dateStart = moment(StartDate).format("YYYY-MM-DDTHH:mm:ssZ");
  const dateEnd = moment(EndDate).format("YYYY-MM-DDTHH:mm:ssZ");
  const queryObj = {
    "Filter.FromDate": dateStart,
    "Filter.ToDate": dateEnd,
  };
  const query = serialize(queryObj);

  return query;
};

const Main = React.forwardRef((props, ref) => {
  const [employees, setEmployees] = useState([]);
  const [workSchedules, setWorkSchedules] = useState([]);
  const t = useTranslate();
  const [visible, setVisible] = useState(false);
  const [employeeId, setEmployeeId] = useState(0);
  const [dateRange, setDateRange] = useState(new Date().getWeek());
  const [empName, setEmpName] = useState("");

  useEffect(() => {
    employeeApi.getList().then((res) => {
      const listEmployee = res?.data?.result?.map((item) => {
        return {
          id: item.id,
          name: `${item.lastName} ${item.firstName}`,
          category: item?.position?.name,
          type: item.isPartTime ? "Full time" : "Part time",
          imageUrl: item.imagePath,
          suggest: "test",
        };
      });

      setEmployees(listEmployee);
    });

    workScheduleApi.getList(0, 900).then((res) => {
      const listWorkSchedule = res?.data?.result?.map((item) => {
        const employeeId = item?.executor?.id || item?.employee?.id
        return {
          resourceId: employeeId,
          name: item?.workspace?.name,
          workspaceName: item?.workspace?.id,
          startDate:
            moment(item?.workSchedule?.workDate).format("YYYY-MM-DD") +
            " " +
            moment(item?.workSchedule?.shift?.startTime, "HH:mm:ss").format(
              "HH:mm"
            ),
          endDate:
            moment(item?.workSchedule?.workDate).format("YYYY-MM-DD") +
            " " +
            moment(item?.workSchedule?.shift?.endTime, "HH:mm:ss").format(
              "HH:mm"
            ),
          location: "Some office",
          iconCls: "b-fa b-fa-calendar",
          shiftName: item?.workSchedule?.shift?.id,
          workScheduleId: item?.workSchedule?.id,
          workCheck: moment(item?.workSchedule?.workDate).format("YYYY-MM-DD"),
        };
      });
      setWorkSchedules(listWorkSchedule);
    });
  }, []);
  const startDate = () => {
    const start = new Date();
    start.setHours(8, 0, 0, 0);
    return start;
  };
  const endDate = () => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return end;
  };

  const showDrawer = (empId, empName) => {
    setEmployeeId(empId);
    setVisible(true);
    setEmpName(empName);
  };

  const onClose = () => {
    setVisible(false);
  };
  console.log(employees);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    const match = dateString.match(/^([0-9]*)-*([0-9]*)th*$/);
    const weekNumber = parseInt(match[2]);

    const dayStart = (weekNumber - 1) * 7 - 4;
    const dayEnd = (weekNumber - 1) * 7 + 2;
    const dateStart = moment(new Date(yearNumber, 0, dayStart)).format(
      "YYYY-MM-DDTHH:mm:ssZ"
    );
    const dateEnd = moment(new Date(yearNumber, 0, dayEnd)).format(
      "YYYY-MM-DDTHH:mm:ssZ"
    );
    const queryObj = {
      "Filter.FromDate": dateStart,
      "Filter.ToDate": dateEnd,
    };
    const query = serialize(queryObj);
    setDateRange(query);
  };

  const checkRole = () => {
    const token = localStorage.getItem("token");
    let role = {};

    try {
      role = jwt_decode(token);
    } catch (e) {
      role = {};
    }

    if (role?.roleName?.toLowerCase() === "staff") {
      return false;
    }
    return true;
  };
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
            text: "Employee",
            width: 220,
            renderer: ({ record }) => {
              return (
                <>
                  <Meta
                    avatar={<ImageThumbnail src={record.imageUrl} />}
                    title={<span style={{ fontSize: 14 }}>{record.name}</span>}
                    description={
                      <>
                        {checkRole() ? (
                          <span
                            className="suggest_request"
                            style={{ fontSize: 12 }}
                            onClick={() => showDrawer(record.id, record.name)}
                          >
                            Suggest
                          </span>
                        ) : (
                          <></>
                        )}
                      </>
                    }
                  />
                </>
              );
            },
          },
          {
            text: "Position",
            field: "category",
            width: 120,
          },
        ]}
      />{" "}
      {/* eo BryntumScheduler */}
      <Drawer
        width={1020}
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ lineHeight: "32px" }}>
              {t("CORE.WORKSPACE.EMP.NAME") + `: ${empName}`}
            </span>
            <WeekPicker
              onChange={onChange}
              defaultValue={moment()}
              placeholder="Select week"
            />
          </div>
        }
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div className="page-header workspace">
          <Table t={t} employeeId={employeeId} dateRange={dateRange} />
        </div>
      </Drawer>
    </>
  );
}); // eo class Main

export default Main;

// eof
