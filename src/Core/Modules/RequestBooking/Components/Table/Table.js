import React, { useMemo } from "react";
import moment from "moment";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";

/* Constants */
import { workspaces as identity } from "~/Core/Modules/RequestBooking/Configs/Constants";

/* Api */
import contactApi from "~/Core/Modules/RequestBooking/Api";

const UserTable = () => {
  const t = useTranslate();
  const defs = useMemo(
    () => [
      {
        title: t("REQUEST.BOOKING.WORKDATE"),
        dataIndex: "workDate",
        className: "header-filter",
        key: "Filter.Name",
        fieldType: "date",
        sorter: true,
        width: 220,
        render: (_, record) => {
          return (
            <Link to={`/request-booking/${record.id}`} >{moment(record.workDate).format("DD/MM/YYYY")}</Link>
          )
        }
      },
      {
        title: t("REQUEST.BOOKING.SHIFT"),
        dataIndex: "shift.name",
        className: "header-filter",
        key: "description",
        fieldType: "text",
        sorter: true,
        width: 320,
      },
      {
        title: t("REQUEST.BOOKING.WORKSPACE"),
        dataIndex: "workspace.name",
        className: "header-filter",
        key: "description",
        fieldType: "text",
        sorter: true,
        width: 320,
      },
      {
        title: t("REQUEST.BOOKING.CREATE"),
        dataIndex: "createdAt",
        className: "header-filter",
        key: "contacts.createdAt",
        fieldType: "date",
        sorter: true,
        width: 150,
        render: (text) => moment(text).format("DD/MM/YYYY"),
      },
      {
        title: t("REQUEST.BOOKING.UPDATE"),
        dataIndex: "updated_at",
        className: "header-filter",
        key: "contacts.updated_at",
        fieldType: "date",
        sorter: true,
        render: (text, record) => {
          if (record?.updatedAt === null) {
            return <span></span>;
          } else {
            return moment(text).format("DD/MM/YYYY");
          }
        },
      },
    ],
    []
  );

  const defaultSorter = useMemo(
    () => ({ "Sort.Orders": "desc createdAt" }),
    []
  );

  const scroll = useMemo(
    () => ({
      x: 960,
      y: `calc(100vh - (178px))`,
    }),
    []
  );

  const token = localStorage.getItem("token" || "");
  const { roleName: role } = jwt_decode(token);
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
    />
  );
};

export default UserTable;
