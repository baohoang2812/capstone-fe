import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button, Divider, Modal, message, Tag } from 'antd';
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";

/* Constants */
import { reports as identity } from "~/Core/Modules/Report/Configs/Constants";

/* Api */
import contactApi from "~/Core/Modules/Report/Api";
import ReportDetailForm from "../Form/ReportDetailForm";

const UserTable = () => {
  const t = useTranslate();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const openModel = (record) => {

    setVisible(true);
    setData(record);
    console.log(data);
  };
  const handleCloseModal = () => {
    setVisible(false);

  };
  const defs = useMemo(() => [
    {
      title: t("CORE.REPORT.ID"),
      dataIndex: "id",
      className: "header-filter",
      key: "id",
      fieldType: "number",
      fixed: "left",
      sorter: true,
      width: 220,
      render: (text, record) => {
       
        if (record.status.toLowerCase() === "opening") {
          return (<Button type="link" style={{paddingLeft:"0"}} onClick={() => openModel(record)}>{`${record.id}`}</Button>)
        }
        else {
          return (
            <Link to={`/report/${record.id}`}>{`${record.id}`}</Link>
          )
        }
      },
    },
    {
      title: t("CORE.REPORT.NAME"),
      dataIndex: "name",
      className: "header-filter",
      key: "name",
      fieldType: "text",
      sorter: true,
      width: 220,

    },
    {
      title: t("CORE.REPORT.DESCRIPTION"),
      dataIndex: "description",
      className: "header-filter",
      key: "description",
      fieldType: "text",
      sorter: true,
      width: 220,
    },
    {
      title: t("CORE.REPORT.STATUS"),
      dataIndex: "status",
      className: "header-filter",
      key: "status",
      fieldType: "text",
      sorter: true,
      width: 220,
      render: (_, record) => {
        if (record.status.toLocaleLowerCase() === 'opening') {
          return (
            <Tag color="orange">{t("CORE.VIOLATION.OPEN")}</Tag>
          )
        }
        else {
          return (
            <Tag color="green">{t("CORE.VIOLATION.SUBMITTED")}</Tag>
          )
        }
      }
    },
    {
      title: t("CORE.REPORT.BRANCH.NAME"),
      dataIndex: "branch.name",
      className: "header-filter",
      key: "branchId",
      fieldType: "text",
      sorter: true,
      width: 220,

    },
    {
      title: t("CORE.REPORT.CREATED.BY"),
      dataIndex: "createdByNavigation.firstName",
      className: "header-filter",
      key: "type",
      fieldType: "text",
      sorter: true,
      width: 220,
      // render: (text, record) => (
      //   <span>{`${record.createdByNavigation.firstName} ${record.createdByNavigation.lastName}`}</span>)
    },


    {
      title: t("CORE.REPORT.CHARGE.CREATE"),
      dataIndex: "createdAt",
      className: "header-filter",
      key: "contacts.create_at",
      fieldType: "date",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: t("CORE.REPORT.CHARGE.UPDATE"),
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
      <Modal
        title={t("CORE.REPORT.DETAIL")}
        visible={visible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <ReportDetailForm data={data} action={handleCloseModal} />

      </Modal>
    </>
  );
};

export default UserTable;
