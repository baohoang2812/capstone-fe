import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import moment from "moment";
import jwt_decode from "jwt-decode";

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
      dataIndex: "imagePath",
      className: "header-filter header-image",
      key: "imagePath",
      fieldType: "none",
      fixed: "left",
      sorter: true,
      width: 200,
      render: (_, record) => {
        return (

          <ImageThumbnail src={record.imagePath} />
        )
      }
    },
    {
      title: t("CORE.EMPLOYEE.CODE"),
      dataIndex: "code",
      className: "header-filter",
      key: "Filter.Code",
      fieldType: "text",
      fixed: "left",
      sorter: true,
      width: 220,
      render: (_, record) => {
        if (role === "Admin") {
          return (
            <Link to={`/employee/detail/${record.id}`}>{`${record.code}`}</Link>
          )
        }
        else {
          return(
            <Link to={`/employee/profile/${record.id}`}>{`${record.code}`}</Link>
          )
        }

      },
    },
    {
      title: t("CORE.EMPLOYEE.FULLNAME"),
      dataIndex: "first_name",
      className: "header-filter",
      key: "Filter.Name",
      fieldType: "text",
      width: 220,
      sorter: true,
      render: (text, record) => (
        <span>{`${record.lastName} ${record.firstName}`}</span>
      ),
    },
    {
      title: t("CORE.EMPLOYEE.ADDRESS"),
      dataIndex: "address",
      className: "header-filter",
      key: "address",
      fieldType: "none",
      sorter: true,
      width: 220,
    },
    {
      title: t("CORE.EMPLOYEE.EMAIL"),
      dataIndex: "email",
      className: "header-filter",
      key: "email",
      fieldType: "none",
      sorter: true,
      width: 200,
    },
    {
      title: t("CORE.EMPLOYEE.GENDER"),
      dataIndex: "gender",
      className: "header-filter",
      key: "gender",
      fieldType: "none",
      sorter: true,
      width: 200,

      render: (_, record) => {
        if (record.gender.toLowerCase() === "female") {
          return (
            <span> {t("CORE.EMPLOYEE.GENDER.FEMALE")}</span>
          )
        }
        else if (record.gender.toLowerCase() === "male") {
          return (
            <span>{t("CORE.EMPLOYEE.GENDER.MALE")}</span>
          )
        }

        else {
          return (
            <span>{t("CORE.EMPLOYEE.GENDER.OTHER")}</span>
          )
        }
      }
    },
    {
      title: t("CORE.EMPLOYEE.PHONE.NUMBER"),
      dataIndex: "phoneNumber",
      className: "header-filter",
      key: "phoneNumber",
      fieldType: "none",
      sorter: true,
      width: 200,
    },
    {
      title: t("CORE.EMPLOYEE.DATE.OF.BIRTH"),
      dataIndex: "birthDate",
      className: "header-filter",
      key: "birthDate",
      fieldType: "none",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: t("CORE.EMPLOYEE.BRANCH.NAME"),
      dataIndex: "branch_name",
      className: "header-filter",
      key: "branch_name",
      fieldType: "none",
      sorter: true,
      width: 220,
      render: (_, record) => record?.branch?.name
    },
    {
      title: t("CORE.EMPLOYEE.POSITION.NAME"),
      dataIndex: "position_name",
      className: "header-filter",
      key: "position_name",
      fieldType: "none",
      sorter: true,
      width: 200,
      render: (_, record) => record?.position?.name
    },
    {
      title: t("CORE.EMPLOYEE.CHARGE.CREATE"),
      dataIndex: "createdAt",
      className: "header-filter",
      key: "contacts.createdAt",
      fieldType: "none",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: t("CORE.EMPLOYEE.CHARGE.UPDATE"),
      dataIndex: "updated_at",
      className: "header-filter",
      key: "contacts.updated_at",
      fieldType: "none",
      sorter: true,
      width: 150,
      render: (text,record) => {
        if(record?.updatedAt===null){
          return(
            <span></span>
          )
        }
        else{
          return(moment(text).format("DD/MM/YYYY"))
        }
      }
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
        if (!record.isPartTime) {
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

  const defaultSorter = useMemo(() => ({
    "Sort.Orders": "desc createdAt"
  }), []);

  const scroll = useMemo(() => ({
    x: 2500,
    y: `calc(100vh - (178px))`
  }), []);

  const token = localStorage.getItem("token" || "");
  const {
    roleName: role,
  } = jwt_decode(token);

  return (
    <AdminTable
      defs={defs}
      api={contactApi}
      identity={identity}
      showCheckbox={role === "Admin"}
      scroll={scroll}
      defaultSorter={defaultSorter}
      disableClassKey="is_active"
      disableClassMode="toggle"
    />
  );
};

export default UserTable;
