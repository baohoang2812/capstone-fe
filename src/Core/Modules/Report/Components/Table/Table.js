import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button,Modal,Tag } from 'antd';
import jwt_decode from "jwt-decode";
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
    // {
    //   title: t("CORE.REPORT.ID"),
    //   dataIndex: "id",
    //   className: "header-filter",
    //   key: "id",
    //   fieldType: "number",
    //   fixed: "left",
    //   sorter: true,
    //   width: 220,
    //   render: (text, record) => {
       
    //     if (record.status.toLowerCase() === "opening") {
    //       return (<Button type="link" style={{paddingLeft:"0"}} onClick={() => openModel(record)}>{`${record.id}`}</Button>)
    //     }
    //     else {
    //       return (
    //         <Link to={`/report/${record.id}`}>{`${record.id}`}</Link>
    //       )
    //     }
    //   },
    // },
    {
      title: t("CORE.REPORT.NAME"),
      dataIndex: "name",
      className: "header-filter",
      key: "Filter.Name",
      fieldType: "text",
      sorter: true,
      width: 220,
      render: (text, record) => {
       
        if (record.status.toLowerCase() === "opening") {
          return (<Button type="link" style={{paddingLeft:"0"}} onClick={() => openModel(record)}>{`${record.name}`}</Button>)
        }
        else {
          return (
            <Link to={`/report/${record.id}`}>{`${record.name}`}</Link>
          )
        }
      },

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
            <Tag color="orange">{t("CORE.VIOLATION.OPENING")}</Tag>
          )
        }
        else if(record.status.toLocaleLowerCase() === 'done') {
          return (
            <Tag color="blue">{t("CORE.REPORT.STATUS.DONE")}</Tag>
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
      title: t("CORE.REPORT.MINUS.POINT"),
      dataIndex: "totalMinusPoint",
      className: "header-filter",
      key: "totalMinusPoint",
      fieldType: "text",
      sorter: true,
      width: 150,

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
      title: t("CORE.REPORT.ADMIN.NOTE"),
      dataIndex: "adminNote",
      className: "header-filter",
      key: "adminNote",
      fieldType: "text",
      sorter: true,
      width: 220,
    },
    {
      title: t("CORE.REPORT.QC.NOTE"),
      dataIndex: "qcNote",
      className: "header-filter",
      key: "qcNote",
      fieldType: "text",
      sorter: true,
      width: 220,
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
      title: t("CORE.REPORT.SUBMITTED.BY"),
      dataIndex: "submittedBySystem",
      className: "header-filter",
      key: "type",
      fieldType: "text",
      sorter: true,
      width: 220,
      render: (_, record) => {
        if (record.submittedBySystem) {
          return (
            <span>Mavca System</span>
          )
        }
        else if(record.status.toLowerCase()==="opening"){
          return (
            <span></span>
          )
        }
        else {
          return (
            <span>Quality Control Manager</span>
          )
        }

      }


      
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



  ], [])

  const defaultSorter = useMemo(() => ({ "Sort.Orders": "desc createdAt"}), []);

  const scroll = useMemo(() => ({
    x: 1550,
    y: `calc(100vh - (178px))`
  }), []);
  const token = localStorage.getItem("token" || "");
  const {
    roleName: role,
  } = jwt_decode(token);
  return (
    <>
      <AdminTable
        defs={defs}
        api={contactApi}
        identity={identity}
        showCheckbox={false}
        scroll={scroll}
        defaultSorter={defaultSorter}
        disableClassKey="is_active"
        disableClassMode="toggle"
        options={role==="Branch Manager"?{key:"Filter.Status",value:"Done"}:null}
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
