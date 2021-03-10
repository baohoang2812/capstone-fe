import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import moment from "moment";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";

/* Constants */
import { cameras as identity } from "~/Core/Modules/Cameras/Configs/constants";

/* Api */
import contactApi from "~/Core/Modules/Cameras/Api";

const UserTable = () => {
  const t = useTranslate();


  const defs = useMemo(() => [
    {
      title: t("CORE.CAMERA.NAME"),
      dataIndex: "name",
      className: "header-filter",
      key: "name",
      fieldType: "text",
      sorter: true,
      width: 220,
      render: (text, record) => (
        <Link to={`/cameras/${record.id}`}>{`${record.name}`}</Link>
      ),
    },
    {
      title: t("CORE.CAMERA.WORKSPACE.NAME"),
      dataIndex: "workspace.name",
      className: "header-filter",
      key: "managerName",
      fieldType: "text",
      sorter: true,
      width: 220,
      render: (text, record) => <span>{`${record?.workspace?.name}`}</span>
    },
    {
      title: t("CORE.CAMERA.CHARGE.CREATE"),
      dataIndex: "createdAt",
      className: "header-filter",
      key: "contacts.create_at",
      fieldType: "date",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: t("CORE.CAMERA.CHARGE.UPDATE"),
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
    x: 1310 ,
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
