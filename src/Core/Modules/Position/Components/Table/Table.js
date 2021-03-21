import React, { useMemo } from "react";
import { Link } from "react-router-dom";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";

/* Constants */
import { positions as identity } from "~/Core/Modules/Position/Configs/constants";

/* Api */
import contactApi from "~/Core/Modules/Position/Api";

const UserTable = () => {
  const t = useTranslate();


  const defs = useMemo(() => [
    {
      title: t("CORE.POSITION.NAME"),
      dataIndex: "name",
      className: "header-filter",
      key: "Filter.Name",
      fieldType: "text",
      sorter: true,
      width: 180,
      render: (text, record) => (
        <Link to={`/position/${record.id}`}>{`${record.name}`}</Link>
      ),
    },
   
    {
      title: t("CORE.POSITION.DESCRIPTION"),
      dataIndex: "description",
      className: "header-filter",
      key: "description",
      fieldType: "none",
      sorter: true,
      width: 280,
    },
    
    
    
   
  ], [])

  const defaultSorter = useMemo(() => ({  "Sort.Orders": "desc createdAt"}), []);
  
  const scroll = useMemo(() => ({
    x: 460 ,
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
