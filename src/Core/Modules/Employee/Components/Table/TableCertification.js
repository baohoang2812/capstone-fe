import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";
import ImageThumbnail from "~/Core/Components/common/ImageThumbnail";

/* Constants */
import { certification as identity } from "~/Core/Modules/Employee/Configs/constants";

/* Api */
import certificationApi from "~/Core/Modules/Employee/Api/Certification";

const UserTable = ({data}) => {
  const t = useTranslate();


  const defs = useMemo(() => [
    {
      title: t("CORE.EMPLOYEE.IMAGE.PATH"),
      dataIndex: "imagePath",
      className: "header-filter header-image",
      key: "imagePath",
      fieldType: "none",
      sorter: true,
      width: 100,
      render: (_, record) => {
        return (
          <ImageThumbnail src={record?.certificateType?.imagePath}/>
        )
      }
    },
    {
      title: t("CORE.CERTIFICATION.NAME"),
      dataIndex: "code",
      className: "header-filter",
      key: "code",
      fieldType: "text",
      sorter: true,
      width: 220,
      render: (text, record) => (
        <Link to={`/employee/${record?.certificateType?.id}`}>{`${record?.certificateType?.name}`}</Link>
      ),
    },
    {
      title: t("CORE.CERTIFICATION.DESCRIPTION"),
      dataIndex: "first_name",
      className: "header-filter",
      key: "first_name",
      fieldType: "text",
      sorter: true,
      render: (text, record) => (
        <span>{record?.certificateType?.description}</span>
      ),
    }
  ], [])

  const defaultSorter = useMemo(() => ({ }), []);
  
  // const scroll = useMemo(() => ({
  //   x: 740 ,
  //   y: `calc(100vh - (178px))`
  // }), []);

  const token = localStorage.getItem("token" || "");
  const {
    roleName: role,
  } = jwt_decode(token);

  return (
    <AdminTable
      defs={defs}
      api={certificationApi}
      identity={identity}
      showCheckbox={role === "Admin"}
      // scroll={scroll}
      defaultSorter={defaultSorter}
      disableClassKey="is_active"
      disableClassMode="toggle"
      options={{key:"Filter.EmployeeIds", value: data}}
    />
  );
};

export default UserTable;
