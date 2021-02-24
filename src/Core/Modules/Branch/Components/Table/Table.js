import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import moment from "moment";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";

/* Constants */
import { branches as identity } from "~/Core/Modules/Branch/Configs/constants";

/* Api */
import contactApi from "~/Core/Modules/Branch/Api";

const UserTable = () => {
  const t = useTranslate();


  const defs = useMemo(() => [
    {
      title: t("CORE.BRANCH.NAME"),
      dataIndex: "name",
      className: "header-filter",
      key: "name",
      fieldType: "text",
      fixed: "left",
      sorter: true,
      width: 220,
      render: (text, record) => (
        <Link to={`/branch/${record.id}`}>{`${record.name}`}</Link>
      ),
    },
    {
      title: t("CORE.BRANCH.ADDRESS"),
      dataIndex: "address",
      className: "header-filter",
      key: "address",
      fieldType: "text",
      sorter: true,
      width: 220,
    },
    
    
    {
      title: t("CORE.BRANCH.PHONE.NUMBER"),
      dataIndex: "phoneNumber",
      className: "header-filter",
      key: "phoneNumber",
      fieldType: "number",
      sorter: true,
      width: 200,
    },
    {
      title: t("CORE.BRANCH.MANAGER.NAME"),
      dataIndex: "manager",
      className: "header-filter",
      key: "managerName",
      fieldType: "text",
      sorter: true,
      width: 220,
      render: (text, record) => <span>{`${record?.manager?.firstName} ${record?.manager?.lastName}`}</span>
    },
    
   
    {
      title: t("CORE.BRANCH.CHARGE.CREATE"),
      dataIndex: "created_at",
      className: "header-filter",
      key: "contacts.create_at",
      fieldType: "date",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: t("CORE.BRANCH.CHARGE.UPDATE"),
      dataIndex: "updated_at",
      className: "header-filter",
      key: "contacts.updated_at",
      fieldType: "date",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
        title: t("CORE.BRANCH.STATUS"),
        dataIndex: "none",
        className: "header-filter header-center",
        key: "action",
        fieldType: "none",
        width: 150,
        render: (_, record) => {
          if (!record.is_deleted) {
            return (
              <Tag color="green">{t("CORE.BRANCH.ACTIVE")}</Tag>
            )
          } else {
            return (
              <Tag color="red">{t("CORE.BRANCH.INACTIVE")}</Tag>
            )
          }
        },
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
