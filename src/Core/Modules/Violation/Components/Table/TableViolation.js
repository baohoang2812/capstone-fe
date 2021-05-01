import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button, Divider, Modal, Tag } from 'antd';
import jwt_decode from "jwt-decode";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";
// import ImageThumbnail from "~/Core/Components/common/ImageThumbnail";
/* Constants */
import { violations as identity } from "~/Core/Modules/Violation/Configs/Constants";
import ViolationDetail from "~/Core/Modules/Violation/Components/Form/ViolationDetail";
import ExcuseDetail from "~/Core/Modules/Violation/Components/Form/ExcuseDetail";
import UpdateViolatorDetail from "~/Core/Modules/Violation/Components/Form/UpdateViolatorDetail";
import AdminAcceptViolation from "~/Core/Modules/Violation/Components/Form/AdminAcceptViolation";

/* Api */
import contactApi from "~/Core/Modules/Violation/Api/Violation";

const UserTable = () => {
  const t = useTranslate();
  const [visible, setVisible] = useState(false);
  const [visibleExcuse, setVisibleExcuse] = useState(false);
  const [visibleViolator, setVisibleViolator] = useState(false);
  const [visibleAdminAccept, setVisibleAdminAccept] = useState(false);
  const [data, setData] = useState({});
  const [isShow, setIsShow] = useState(true);
  const openModel = (record) => {

    setVisible(true);
    setData(record);
  };
  const openModelAdminAccept = (record) => {
    setVisibleAdminAccept(true);
    setData(record);
  };

  const openModelViolator = (record) => {

    setVisibleViolator(true);
    setData(record);
  };

  const openModelExcuse = (record, isShow = true) => {
    setVisibleExcuse(true);
    setData(record);
    setIsShow(isShow);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setVisibleExcuse(false);
    setVisibleViolator(false);
    setVisibleAdminAccept(false);
  };

  const defs = useMemo(() => [


    {
      title: t("CORE.VIOLATION.NAME"),
      dataIndex: "name",
      className: "header-filter",
      key: "Filter.Name",
      fieldType: "text",
      sorter: true,
      width: 240,
      render: (_, record) => {
        return (
          <Link onClick={() => { openModelExcuse(record, false) }} >{`${record.name}`}</Link>
        )
      }

    },
    {
      title: t("CORE.VIOLATION.STATUS"),
      dataIndex: "status",
      className: "header-filter",
      key: "Filter.Status",
      fieldType: "text",
      sorter: true,
      width: 230,
      render: (_, record) => {
        if (record.status.toLocaleLowerCase() === 'confirmed') {
          return (
            <Tag color="green">{t("CORE.VIOLATION.CONFIRMED")}</Tag>
          )
        } else if (record.status.toLocaleLowerCase() === 'opening') {
          return (
            <Tag color="orange">{t("CORE.VIOLATION.OPENING")}</Tag>
          )
        } else if (record.status.toLocaleLowerCase() === 'rejected') {
          return (
            <Tag color="red">{t("CORE.VIOLATION.REJECTED")}</Tag>
          )
        }
        else if(record.status.toLocaleLowerCase() === 'excused') {
          return (
            <Tag color="blue">{t("CORE.VIOLATION.STATUS.EXCUSE")}</Tag>
          )
        }
      },
    },
    {
      title: t("CORE.REGULATION.NAME"),
      dataIndex: "regulation.name",
      className: "header-filter",
      key: "name_regulation",
      fieldType: "none",
      sorter: true,
      width: 220,

    },
    {
      title: t("CORE.VIOLATION.DESCRIPTION"),
      dataIndex: "description",
      className: "header-filter",
      key: "description",
      fieldType: "none",
      sorter: true,
      width: 220,
    },
    {
      title: t("CORE.VIOLATION.EXCUSE"),
      dataIndex: "excuse",
      className: "header-filter",
      key: "excuse",
      fieldType: "none",
      sorter: true,
      width: 220,
      render: (_,record) => {
        if(record?.excuse===null || record?.excuse===""){
          return(
            <span>N/A</span>
          )
        }
        else{
          return( <span>{record?.excuse}</span>)
        }
      }
    },
    {
      title: t("CORE.VIOLATION.WORKSPACE"),
      dataIndex: "workspace",
      className: "header-filter",
      key: "workspace",
      fieldType: "none",
      sorter: true,
      width: 220,
      render:(_,record)=> {
        if(record?.workspace?.length===0){
          return(
            <span>N/A</span>
          )
        }
        else{
          return(
            <span>{record?.workspace?.[0]?.name}</span>)
          }
        
    }
    },
    {
      title: t("CORE.VIOLATION.MINUS.POINT"),
      dataIndex: "minusPoint",
      className: "header-filter",
      key: "minusPoint",
      fieldType: "none",
      sorter: true,
      width: 150,
    },


    {
      title: t("CORE.VIOLATION.CHARGE.CREATE"),
      dataIndex: "createdAt",
      className: "header-filter",
      key: "contacts.create_at",
      fieldType: "none",
      sorter: true,
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: t("CORE.VIOLATION.CHARGE.UPDATE"),
      dataIndex: "updatedAt",
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
      title: t("CORE.VIOLATION.ACTION"),
      dataIndex: "none",
      className: "header-filter",
      key: "violation.action",
      fieldType: "none",
      fixed: "right",
      sorter: true,
      width: 220,
      render: (_, record) => renderAction(record),
    },



  ], [])

  const renderAction = (record) => {
    const token = localStorage.getItem("token" || "");
    const {
      roleName: role,
    } = jwt_decode(token);
    console.log(role);
    if (role === "Admin") {
      const isDisable = record?.status?.toLocaleLowerCase() === 'excused'
      return (
          <>
            <Button disabled={!isDisable} onClick={() => { openModelExcuse(record) }} type="danger">
              {t("CORE.VIOLATION.ACTION.REJECT")}
            </Button>
            <Divider type="vertical" />
            <Button disabled={!isDisable} onClick={() => { openModelAdminAccept(record) }} type="primary">
              {t("CORE.VIOLATION.ACTION.ACCEPT")}
            </Button>
          </>
        )
    } else if( role==="Branch Manager") {
      const isDisable = record?.status?.toLocaleLowerCase() === 'opening';
      return (
          <>
            <Button disabled={!isDisable} onClick={() => { openModel(record) }} type="danger">
              {t("CORE.VIOLATION.ACTION.REJECT")}
            </Button>
            <Divider type="vertical" />
            <Button disabled={!isDisable} onClick={() => { openModelViolator(record) }} type="primary">
              {t("CORE.VIOLATION.ACTION.ACCEPT")}
            </Button>
          </>
        )
    }
    else{
      return(<></>)
    }
  }

  const defaultSorter = useMemo(() => ({ "Sort.Orders": "desc createdAt" }), []);

  const scroll = useMemo(() => ({
    x: 1870,
    y: `calc(100vh - (178px))`
  }), []);

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
      />
      <Modal
        title={t("CORE.VIOLATION.MANAGEMENT.TITLE")}
        visible={visible}
        onCancel={handleCloseModal}
        footer={null}
        width="900px"
      >
        <ViolationDetail data={data} action={handleCloseModal} />
      </Modal>
      <Modal
        title={t("CORE.VIOLATION.MANAGEMENT.TITLE")}
        visible={visibleExcuse}
        onCancel={handleCloseModal}
        footer={null}
        width="900px"
      >
        <ExcuseDetail data={data} isShow={isShow} action={handleCloseModal} />
      </Modal>

      <Modal
        title={t("CORE.VIOLATION.MANAGEMENT.TITLE")}
        visible={visibleViolator}
        onCancel={handleCloseModal}
        footer={null}
        width="900px"
      >
        <UpdateViolatorDetail data={data} action={handleCloseModal} />
      </Modal>

      <Modal
        title={t("CORE.VIOLATION.MANAGEMENT.TITLE")}
        visible={visibleAdminAccept}
        onCancel={handleCloseModal}
        footer={null}
        width="900px"
      >
        <AdminAcceptViolation data={data} action={handleCloseModal} />
      </Modal>
    </>
  );
};

export default UserTable;
