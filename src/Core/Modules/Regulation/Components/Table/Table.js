import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";

/* Constants */
import { regulations as identity } from "~/Core/Modules/Regulation/Configs/constants";

/* Api */
import contactApi from "~/Core/Modules/Regulation/Api";

const UserTable = () => {
  const t = useTranslate();


  const defs = useMemo(() => [
    {
      title: t("CORE.REGULATION.NAME"),
      dataIndex: "name",
      className: "header-filter",
      key: "name",
      fieldType: "text",
      fixed: "left",
      sorter: true,
      width: 220,
      render: (text, record) => (
        <Link to={`/regulation/${record.id}`}>{`${record.name}`}</Link>
      ),
    },
    {
      title: t("CORE.REGULATION.TYPE"),
      dataIndex: "type",
      className: "header-filter",
      key: "type",
      fieldType: "text",
      sorter: true,
      width: 220,
    },
    
    
    {
      title: t("CORE.REGULATION.LEVEL"),
      dataIndex: "level",
      className: "header-filter",
      key: "level",
      fieldType: "number",
      sorter: true,
      width: 200,
    },
    {
      title: t("CORE.REGULATION.MINUS.POINT"),
      dataIndex: "minusPoint",
      className: "header-filter",
      key: "point",
      fieldType: "number",
      sorter: true,
      width: 200,
    },
    {
      title: t("CORE.REGULATION.DESCRIPTION"),
      dataIndex: "description",
      className: "header-filter",
      key: "description",
      fieldType: "text",
      sorter: true,
      width: 240,
    },
    {
      title: t("CORE.REGULATION.CHARGE.CREATE"),
      dataIndex: "created_at",
      className: "header-filter",
      key: "contacts.create_at",
      fieldType: "date",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: t("CORE.REGULATION.CHARGE.UPDATE"),
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
    x: 1080 ,
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