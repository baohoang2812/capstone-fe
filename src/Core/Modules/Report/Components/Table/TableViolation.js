import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";
import ImageThumbnail from "~/Core/Components/common/ImageThumbnail";
/* Constants */
import { violations as identity } from "~/Core/Modules/Report/Configs/Constants";

/* Api */
import contactApi from "~/Core/Modules/Report/Api";

const UserTable = () => {
  const t = useTranslate();


  const defs = useMemo(() => [
    {
      title: t("CORE.VIOLATION.ID"),
      dataIndex: "id",
      className: "header-filter",
      key: "id",
      fieldType: "number",
      fixed: "left",
      sorter: true,
      width: 220,
      render: (text, record) => (
        <Link to={`/regulation/${record.id}`}>{`${record.id}`}</Link>
      ),
    },
    {
      title: t("CORE.VIOLATION.IMAGE.PATH"),
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
      title: t("CORE.VIOLATION.NAME"),
      dataIndex: "name",
      className: "header-filter",
      key: "name",
      fieldType: "text",
      fixed: "left",
      sorter: true,
      width: 220,

    },
    {
      title: t("CORE.REGULATION.NAME"),
      dataIndex: "name",
      className: "header-filter",
      key: "name",
      fieldType: "text",
      fixed: "left",
      sorter: true,
      width: 220,

    },
    {
      title: t("CORE.VIOLATION.DESCRIPTION"),
      dataIndex: "description",
      className: "header-filter",
      key: "description",
      fieldType: "text",
      sorter: true,
      width: 220,
    },
    {
      title: t("CORE.VIOLATION.STATUS"),
      dataIndex: "status",
      className: "header-filter",
      key: "status",
      fieldType: "text",
      sorter: true,
      width: 220,
    },

    {
      title: t("CORE.VIOLATION.CHARGE.CREATE"),
      dataIndex: "createdAt",
      className: "header-filter",
      key: "contacts.create_at",
      fieldType: "date",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: t("CORE.VIOLATION.CHARGE.UPDATE"),
      dataIndex: "updatedAt",
      className: "header-filter",
      key: "contacts.updated_at",
      fieldType: "date",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },



  ], [])

  const defaultSorter = useMemo(() => ({}), []);

  const scroll = useMemo(() => ({
    x: 1620,
    y: `calc(100vh - (178px))`
  }), []);

  return (
    <>
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
    </>
  );
};

export default UserTable;
