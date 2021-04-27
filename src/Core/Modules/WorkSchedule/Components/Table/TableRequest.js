import React, { useMemo } from "react";
import moment from "moment";
import jwt_decode from "jwt-decode";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";

/* Constants */
import { requestBooking as identity } from "~/Core/Modules/WorkSchedule/Configs/Constants";

/* Api */
import contactApi from "~/Core/Modules/WorkSchedule/Api/RequestBookingApi";
import { Tag } from "antd";

const color = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]
const UserTable = ({ employeeId, dateRange }) => {
  const t = useTranslate();

  const defs = useMemo(
    () => [
      {
        title: t("REQUEST.BOOKING.WORKDATE"),
        dataIndex: "workDate",
        className: "header-filter",
        key: "workDate",
        fieldType: "date",
        sorter: true,
        width: 150,
        render: (text) => moment(text).format("DD/MM/YYYY"),
      },
      {
        title: t("REQUEST.BOOKING.SHIFT"),
        dataIndex: "shift",
        className: "header-filter",
        key: "description",
        fieldType: "text",
        sorter: true,
        width: 220,
        render: (_, { shift }) => (
          <>
            {shift?.map((item) => {
              const randomColor = Math.floor(Math.random() * 10);
              return (
                <Tag color={color[randomColor]}>
                  {item.name}(
                  {moment(item.startTime, "HH:mm:ss").format("HH:mm")} -{" "}
                  {moment(item.endTime, "HH:mm:ss").format("HH:mm")})
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: t("REQUEST.BOOKING.WORKSPACE"),
        dataIndex: "workspace",
        className: "header-filter",
        key: "description",
        fieldType: "text",
        sorter: true,
        width: 320,
        render: (_, { workspace }) => (
          <>
            {workspace?.map((item) => {
              const randomColor = Math.floor(Math.random() * 10);
              return (
                <Tag color={color[randomColor]}>
                  {item}
                </Tag>
              );
            })}
          </>
        ),
      }
    ],
    []
  );

  const defaultSorter = useMemo(
    () => ({ "Sort.Orders": "desc createdAt" }),
    []
  );

  const scroll = useMemo(
    () => ({
      x: 840,
      y: `calc(100vh - (178px))`,
    }),
    []
  );

  const token = localStorage.getItem("token" || "");
  const { roleName: role } = jwt_decode(token);
  console.log(employeeId);
  return (
    <AdminTable
      defs={defs}
      api={contactApi}
      identity={identity}
      showCheckbox={role === "Staff"}
      scroll={scroll}
      defaultSorter={defaultSorter}
      disableClassKey="is_active"
      disableClassMode="toggle"
      options={{ key: `${dateRange}&Filter.EmployeeId`, value: employeeId }}
      refreshKey={`${employeeId} ${dateRange}`}
      hasCheckDeleted={false}
    />
  );
};

export default UserTable;
