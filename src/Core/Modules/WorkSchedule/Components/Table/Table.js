import React, { useMemo } from "react";
import moment from "moment";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";

/* Constants */
import { workSchedules as identity } from "~/Core/Modules/WorkSchedule/Configs/Constants";

/* Api */
import contactApi from "~/Core/Modules/WorkSchedule/Api";

const UserTable = () => {
  const t = useTranslate();
  const defs = useMemo(() => [
   
    {
      title: t("CORE.WORKSCHEDULE.SHIFT.NAME"),
      dataIndex: "shiftId",
      className: "header-filter",
      key: "shiftId",
      fieldType: "text",
      sorter: true,
      width: 220,
      
    },
    {
        title: t("CORE.WORKSCHEDULE.WORK.DATE"),
        dataIndex: "workDate",
        className: "header-filter",
        key: "contacts.updated_at",
        fieldType: "date",
        sorter: true,
        width: 150,
        render: (text) => moment(text).format("DD/MM/YYYY"),
        
      },
      {
        title: t("CORE.WORKSCHEDULE.CHARGE.CREATE"),
        dataIndex: "createdAt",
        className: "header-filter",
        key: "contacts.create_at",
        fieldType: "date",
        sorter: true,
        width: 150,
        render: (text) => moment(text).format("DD/MM/YYYY"),
      },
      {
        title: t("CORE.WORKSCHEDULE.CHARGE.UPDATE"),
        dataIndex: "updatedAt",
        className: "header-filter",
        key: "contacts.updated_at",
        fieldType: "date",
        sorter: true,
        width: 150,
        render: (text) => moment(text).format("DD/MM/YYYY"),
      },
    {
      title: t("CORE.WORKSCHEDULE.CREATED.BY"),
      dataIndex: "createdBy",
      className: "header-filter",
      key: "createdBy",
      fieldType: "text",
      sorter: true,
      width: 220,
    },
    
  ], [])

  const defaultSorter = useMemo(() => ({ }), []);
  
  const scroll = useMemo(() => ({
    x: 890 ,
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
