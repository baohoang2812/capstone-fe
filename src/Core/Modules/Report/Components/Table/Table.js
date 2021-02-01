import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";

/* Constants */
import { reports as identity } from "~/Core/Modules/Report/Configs/Constants";

/* Api */
import contactApi from "~/Core/Modules/Report/Api";

const UserTable = () => {
  const t = useTranslate();
  const defs = useMemo(() => [
    {
        title: t("CORE.REPORT.ID"),
        dataIndex: "id",
        className: "header-filter",
        key: "id",
        fieldType: "number",
        fixed: "left",
        sorter: true,
        width: 220,
        render: (text, record) => (
          <Link to={`/report/${record.id}`}>{`${record.id}`}</Link>
        ),
      },
    {
      title: t("CORE.REPORT.NAME"),
      dataIndex: "name",
      className: "header-filter",
      key: "name",
      fieldType: "text",
      sorter: true,
      width: 220,
      
    },
    {
      title: t("CORE.REPORT.DESCRIPTION"),
      dataIndex: "description",
      className: "header-filter",
      key: "description",
      fieldType: "text",
      sorter: true,
      width: 220,
    },
    {
        title: t("CORE.REPORT.STATUS"),
        dataIndex: "status",
        className: "header-filter",
        key: "status",
        fieldType: "text",
        sorter: true,
        width: 220,
      },
      {
        title: t("CORE.REPORT.BRANCH.NAME"),
        dataIndex: "branchId",
        className: "header-filter",
        key: "branchId",
        fieldType: "text",
        fixed: "left",
        sorter: true,
        width: 220,
        
      },
      {
        title: t("CORE.REPORT.CREATED.BY"),
        dataIndex: "createdBy",
        className: "header-filter",
        key: "type",
        fieldType: "text",
        sorter: true,
        width: 220,
      },

    
    {
      title: t("CORE.REPORT.CHARGE.CREATE"),
      dataIndex: "createdAt",
      className: "header-filter",
      key: "contacts.create_at",
      fieldType: "date",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: t("CORE.REPORT.CHARGE.UPDATE"),
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
    x: 1620 ,
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
