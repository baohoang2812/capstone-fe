import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";

/* Constants */
import { workspaces as identity } from "~/Core/Modules/Workspace/Configs/Constants";

/* Api */
import contactApi from "~/Core/Modules/Workspace/Api";

const UserTable = () => {
  const t = useTranslate();
  const defs = useMemo(() => [
   
    {
      title: t("CORE.WORKSPACE.NAME"),
      dataIndex: "name",
      className: "header-filter",
      key: "name",
      fieldType: "text",
      sorter: true,
      width: 220,
      fixed:"left",
      render: (text, record) => (
        <Link to={`/workspace/${record.id}`}>{`${record.name}`}</Link>
      ),
      
    },
  
    {
      title: t("CORE.WORKSPACE.DESCRIPTION"),
      dataIndex: "description",
      className: "header-filter",
      key: "description",
      fieldType: "text",
      sorter: true,
      width: 220,
    },
    {
        title: t("CORE.WORKSPACE.PARENT"),
        dataIndex: "parent",
        className: "header-filter",
        key: "parent",
        fieldType: "text",
        sorter: true,
        width: 220,
        render: (_, record) => record?.parent?.name
      },
      {
        title: t("CORE.WORKSPACE.CHARGE.CREATE"),
        dataIndex: "createdAt",
        className: "header-filter",
        key: "contacts.createdAt",
        fieldType: "date",
        sorter: true,
        width: 150,
        render: (text) => moment(text).format("DD/MM/YYYY"),
      },
      {
        title: t("CORE.WORKSPACE.CHARGE.UPDATE"),
        dataIndex: "updated_at",
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
    x: 960 ,
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