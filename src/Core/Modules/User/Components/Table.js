import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import moment from "moment";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";

/* Constants */
import { users as identity } from "~/Core/Modules/User/Configs/constants";

/* Api */
import contactApi from "~/Core/Modules/User/Api";

const UserTable = () => {
  const t = useTranslate();

  const defs = useMemo(() => [
    {
      title: t("CORE.USER.FULLNAME"),
      dataIndex: "first_name",
      className: "header-filter",
      key: "first_name",
      fieldType: "text",
      width: 220,
      sorter: true,
      render: (text, record) => (
        <Link to={`/user/${record.id}/edit`}>{`${record.first_name} ${record.last_name}`}</Link>
      ),
    },
    {
      title: t("CORE.USER.USERNAME"),
      dataIndex: "username",
      className: "header-filter",
      key: "username",
      fieldType: "text",
      sorter: true,
      width: 220,
    },
    {
      title: t("CORE.USER.PHONE.NUMBER"),
      dataIndex: "phone_number",
      className: "header-filter",
      key: "phone_number",
      fieldType: "number",
      sorter: true,
      width: 200,
    },
    {
      title: t("CORE.USER.CHARGE.CREATE"),
      dataIndex: "created_at",
      className: "header-filter",
      key: "contacts.created_at",
      fieldType: "date",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: t("CORE.USER.CHARGE.UPDATE"),
      dataIndex: "updated_at",
      className: "header-filter",
      key: "contacts.updated_at",
      fieldType: "date",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: t("CORE.USER.CHARGE.ACTION"),
      dataIndex: "none",
      className: "header-filter header-center",
      key: "action",
      fieldType: "none",
      render: (_, record) => {
        if (record.is_active) {
          return (
            <Tag color="green">{t("CORE.USER.ACTIVE")}</Tag>
          )
        } else {
          return (
            <Tag color="red">{t("CORE.USER.CHARGE.INACTIVE")}</Tag>
          )
        }
      },
    },
  ], [])

  return (
    <AdminTable
      defs={defs}
      api={contactApi}
      identity={identity}
      showCheckbox={true}
      disableClassKey="is_active"
      disableClassMode="toggle"
    />
  );
};

export default UserTable;
