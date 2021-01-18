import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import moment from "moment";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";
import ImageThumbnail from "~/Core/Components/common/ImageThumbnail";

/* Constants */
import { employees as identity } from "~/Core/Modules/Employee/Configs/constants";

/* Api */
import contactApi from "~/Core/Modules/Employee/Api";

const UserTable = () => {
  const t = useTranslate();


  const defs = useMemo(() => [
    {
      title: t("CORE.EMPLOYEE.IMAGE.PATH"),
      dataIndex: "image_path",
      className: "header-filter header-image",
      key: "image_path",
      fieldType: "none",
      fixed: "left",
      sorter: true,
      width: 200,
      render: (_, record) => {
        return (
          <ImageThumbnail src={record.image_path}/>
        )
      }
    },
    {
      title: t("CORE.EMPLOYEE.CODE"),
      dataIndex: "code",
      className: "header-filter",
      key: "code",
      fieldType: "text",
      fixed: "left",
      sorter: true,
      width: 220,
      render: (text, record) => (
        <Link to={`/employee/${record.id}`}>{`${record.code}`}</Link>
      ),
    },
    {
      title: t("CORE.EMPLOYEE.FULLNAME"),
      dataIndex: "first_name",
      className: "header-filter",
      key: "first_name",
      fieldType: "text",
      width: 220,
      sorter: true,
      render: (text, record) => (
        <span>{`${record.first_name} ${record.last_name}`}</span>
      ),
    },
    {
      title: t("CORE.EMPLOYEE.ADDRESS"),
      dataIndex: "address",
      className: "header-filter",
      key: "address",
      fieldType: "text",
      sorter: true,
      width: 220,
    },
    {
      title: t("CORE.EMPLOYEE.EMAIL"),
      dataIndex: "email",
      className: "header-filter",
      key: "email",
      fieldType: "text",
      sorter: true,
      width: 200,
    },
    {
      title: t("CORE.EMPLOYEE.GENDER"),
      dataIndex: "gender",
      className: "header-filter",
      key: "gender",
      fieldType: "text",
      sorter: true,
      width: 200,
    },
    {
      title: t("CORE.EMPLOYEE.PHONE.NUMBER"),
      dataIndex: "phone_number",
      className: "header-filter",
      key: "phone_number",
      fieldType: "number",
      sorter: true,
      width: 200,
    },
    {
      title: t("CORE.EMPLOYEE.DATE.OF.BIRTH"),
      dataIndex: "birth_date",
      className: "header-filter",
      key: "birth_date",
      fieldType: "date",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: t("CORE.EMPLOYEE.BRANCH.NAME"),
      dataIndex: "branch_name",
      className: "header-filter",
      key: "branch_name",
      fieldType: "text",
      sorter: true,
      width: 220,
    },
    {
      title: t("CORE.EMPLOYEE.POSITION.NAME"),
      dataIndex: "position_name",
      className: "header-filter",
      key: "position_name",
      fieldType: "text",
      sorter: true,
      width: 200,
    },
    {
      title: t("CORE.EMPLOYEE.CHARGE.CREATE"),
      dataIndex: "created_at",
      className: "header-filter",
      key: "contacts.create_at",
      fieldType: "date",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: t("CORE.EMPLOYEE.CHARGE.UPDATE"),
      dataIndex: "updated_at",
      className: "header-filter",
      key: "contacts.updated_at",
      fieldType: "date",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: t("CORE.EMPLOYEE.JOB.TYPE"),
      dataIndex: "none",
      className: "header-filter header-center",
      key: "action",
      fieldType: "none",
      fixed: "right",
      width: 150,
      render: (_, record) => {
        if (record.is_active) {
          return (
            <Tag color="green">{t("CORE.EMPLOYEE.FULL.TIME")}</Tag>
          )
        } else {
          return (
            <Tag color="blue">{t("CORE.EMPLOYEE.PART.TIME")}</Tag>
          )
        }
      },
    },
  ], [])

  const defaultSorter = useMemo(() => ({ }), []);
  
  const scroll = useMemo(() => ({
    x: 2500 ,
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
