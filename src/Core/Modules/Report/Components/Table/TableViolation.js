import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Button, Divider, Modal, message, Tag } from 'antd';
import jwt_decode from "jwt-decode";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";
import ImageThumbnail from "~/Core/Components/common/ImageThumbnail";
/* Constants */
import { violations as identity } from "~/Core/Modules/Report/Configs/Constants";
import ViolationDetail from "~/Core/Modules/Report/Components/Form/ViolationDetail";
import ExcuseDetail from "~/Core/Modules/Report/Components/Form/ExcuseDetail";
import UpdateViolatorDetail from "~/Core/Modules/Report/Components/Form/UpdateViolatorDetail";
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";
/* Api */
import contactApi from "~/Core/Modules/Report/Api/Violation";
const { confirm } = Modal;

const UserTable = () => {
  const t = useTranslate();
  const [visible, setVisible] = useState(false);
  const [visibleExcuse, setVisibleExcuse] = useState(false);
  const [visibleViolator, setVisibleViolator] = useState(false);
  const [data, setData] = useState({});
  const [isShow, setIsShow] = useState(true);
  const dispatch = useDispatch();

  const showConfirm = (record) => {

    confirm({
      title: t("CORE.VIOLATION.CONFIRM"),
      content: t("CORE.VIOLATION.CONFIRM.CONTENT"),
      onOk() {
        contactApi.update(
          record.id,
          {
            excuse: "string",
            name: "string",
            description: "string",
            imagePath: "string",
            reportId: 0,
            regulationId: 0,
            status: "Declined",
            branchId: 0

          }
        )
          .then((res) => {


            if (res.code !== 200) {
              message.error(t("CORE.task_failure"));
              return;
            }


            dispatch(update_identity_table_data_success(identity, { id: res.data.id, column: "status", data: res.data.status }));
            message.success(t("CORE.POSITION.CREATE.SUCCESS"));

          })
          .catch(() => {
            message.error(t("CORE.error.system"));
          });
      },
      onCancel() {
        console.log(t("CORE.VIOLATION.CONFIRM.CANCEL"));
      },
      okText: t("CORE.VIOLATION.CONFIRM.ACCEPT"),
      cancelText: t("CORE.VIOLATION.CONFIRM.CANCEL")
    });
  }
  const openModel = (record) => {

    setVisible(true);
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
  };

  const defs = useMemo(() => [

    {
      title: t("CORE.VIOLATION.IMAGE.PATH"),
      dataIndex: "imagePath",
      className: "header-filter header-image",
      key: "imagePath",
      fieldType: "none",

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
      key: "status",
      fieldType: "text",
      sorter: true,
      width: 230,
      render: (_, record) => {
        if (record.status.toLocaleLowerCase() === 'confirmed') {
          return (
            <Tag color="green">{t("CORE.VIOLATION.CONFIRMED")}</Tag>
          )
        } else if (record.status.toLocaleLowerCase() === 'open') {
          return (
            <Tag color="orange">{t("CORE.VIOLATION.OPEN")}</Tag>
          )
        } else if (record.status.toLocaleLowerCase() === 'declined') {
          return (
            <Tag color="red">{t("CORE.VIOLATION.DECLINED")}</Tag>
          )
        }
        else {
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
      fieldType: "text",
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
      title: t("CORE.VIOLATION.EXCUSE"),
      dataIndex: "excuse",
      className: "header-filter",
      key: "excuse",
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
      const isDisable = record?.status?.toLocaleLowerCase() === 'excuse'
      return (
          <>
            <Button disabled={!isDisable} onClick={() => { openModelExcuse(record) }} type="danger">
              {t("CORE.VIOLATION.ACTION.REJECT")}
            </Button>
            <Divider type="vertical" />
            <Button disabled={!isDisable} onClick={() => { showConfirm(record) }} type="primary">
              {t("CORE.VIOLATION.ACTION.ACCEPT")}
            </Button>
          </>
        )
    } else {
      const isDisable = record?.status?.toLocaleLowerCase() === 'open';
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
  }

  const defaultSorter = useMemo(() => ({}), []);

  const scroll = useMemo(() => ({
    x: 1700,
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
      >
        <ViolationDetail data={data} action={handleCloseModal} />
      </Modal>
      <Modal
        title={t("CORE.VIOLATION.MANAGEMENT.TITLE")}
        visible={visibleExcuse}
        onCancel={handleCloseModal}
        footer={null}
      >
        <ExcuseDetail data={data} isShow={isShow} action={handleCloseModal} />
      </Modal>

      <Modal
        title={t("CORE.VIOLATION.MANAGEMENT.TITLE")}
        visible={visibleViolator}
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdateViolatorDetail data={data} action={handleCloseModal} />
      </Modal>
    </>
  );
};

export default UserTable;
