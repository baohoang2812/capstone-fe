import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import moment from "moment";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";

/* Constants */
import { shifts as identity } from "~/Core/Modules/Shift/Configs/Constants";

/* Api */
import contactApi from "~/Core/Modules/Shift/Api";

const UserTable = () => {
  const t = useTranslate();
  const defs = useMemo(() => [
   
    {
      title: t("CORE.SHIFT.NAME"),
      dataIndex: "name",
      className: "header-filter",
      key: "name",
      fieldType: "text",
      sorter: true,
      width: 220,
      fixed:"left",
      render: (text, record) => (
        <Link to={`/shift/${record.id}`}>{`${record.name}`}</Link>
      ),
      
    },
  
    {
      title: t("CORE.SHIFT.TYPE"),
      dataIndex: "isBreakShift",
      className: "header-filter",
      key: "description",
      fieldType: "text",
      sorter: true,
      width: 220,
      render: (_, record) => {
        if (!record.isBreakShift) {
          return (
            <Tag color="green">{t("CORE.SHIFT.FULL.SHIFT")}</Tag>
          )
        } else {
          return (
            <Tag color="blue">{t("CORE.SHIFT.BREAK.SHIFT")}</Tag>
          )
        }
      },
    },
    {
        title: t("CORE.SHIFT.START.TIME"),
        dataIndex: "startTime",
        className: "header-filter",
        key: "contacts.startTime",
        fieldType: "date",
        sorter: true,
        width: 150,
        render: (startTime) => {
          return moment(startTime, "HH:mm:ss").format("HH:mm")
          // return `${startTime.hours < 10 ? '0' + startTime.hours : startTime.hours}:${startTime.minutes < 10 ? '0' + startTime.minutes : startTime.minutes}`
        },
      },
      {
        title: t("CORE.SHIFT.END.TIME"),
        dataIndex: "endTime",
        className: "header-filter",
        key: "contacts.updated_at",
        fieldType: "date",
        sorter: true,
        width: 150,
        render: (endTime) => {
           return moment(endTime, "HH:mm:ss").format("HH:mm")
          // return `${endTime.hours < 10 ? '0' + endTime.hours : endTime.hours}:${endTime.minutes < 10 ? '0' + endTime.minutes : endTime.minutes}` 
        },
      },
      
      {
        title: t("CORE.SHIFT.CHARGE.CREATE"),
        dataIndex: "createdAt",
        className: "header-filter",
        key: "contacts.createdAt",
        fieldType: "date",
        sorter: true,
        width: 150,
        render: (text) => moment(text).format("DD/MM/YYYY"),
      },
      {
        title: t("CORE.SHIFT.CHARGE.UPDATE"),
        dataIndex: "updatedAt",
        className: "header-filter",
        key: "contacts.updated_at",
        fieldType: "date",
        sorter: true,
        width: 150,
        render: (text) => moment(text).format("DD/MM/YYYY"),
      },
      

    
   
    
   
  ], [])

  const defaultSorter = useMemo(() => ({ }), []);
  
  const scroll = useMemo(() => ({
    x: 1040 ,
    y: `calc(100vh - (178px))`
  }), []);

  return (
    <AdminTable
      defs={defs}
      api={contactApi}
      identity={identity}
      showCheckbox={true}
      scroll={scroll}
      defaultSorter={defaultSorter}
      disableClassKey="is_active"
      disableClassMode="toggle"
    />
  );
};

export default UserTable;
