import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import jwt_decode from "jwt-decode";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";
import ImageThumbnail from "~/Core/Components/common/ImageThumbnail";

/* Constants */
import { certificateTypes as identity } from "~/Core/Modules/CertificateType/Configs/Constants";

/* Api */
import contactApi from "~/Core/Modules/CertificateType/Api";

const UserTable = () => {
  const t = useTranslate();


  const defs = useMemo(() => [
    {
      title: t("CORE.CERTIFICATE.TYPE.IMAGE.PATH"),
      dataIndex: "imagePath",
      className: "header-filter header-image",
      key: "imagePath",
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
      title: t("CORE.CERTIFICATE.TYPE.NAME"),
      dataIndex: "name",
      className: "header-filter",
      key: "name",
      fieldType: "text",
      width: 220,
      sorter: true,
      render: (text, record) => (
        <Link to={`/certificateType/${record.id}`}>{`${record.name}`}</Link>
      ),
    },
    {
      title: t("CORE.CERTIFICATE.TYPE.DESCRIPTION"),
      dataIndex: "description",
      className: "header-filter",
      key: "description",
      fieldType: "text",
      sorter: true,
      width: 220,
    },
    
    {
      title: t("CORE.CERTIFICATE.TYPE.CHARGE.CREATE"),
      dataIndex: "createAt",
      className: "header-filter",
      key: "contacts.createAt",
      fieldType: "date",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: t("CORE.CERTIFICATE.TYPE.CHARGE.UPDATE"),
      dataIndex: "updatedAt",
      className: "header-filter",
      key: "contacts.updatedAt",
      fieldType: "date",
      sorter: true,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
  ], [])

  const defaultSorter = useMemo(() => ({ }), []);
  
  const scroll = useMemo(() => ({
    x: 940 ,
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
