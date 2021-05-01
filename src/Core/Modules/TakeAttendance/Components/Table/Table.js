import React, { useMemo, useState } from "react";
// import { Tag } from "antd";
import moment from "moment";
import jwt_decode from "jwt-decode";
import { Button, Divider, Tag, Modal, message } from 'antd';
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";
/* Constants */
import { attendance as identity } from "~/Core/Modules/TakeAttendance/Configs/Constants";

/* Api */
import contactApi from "~/Core/Modules/TakeAttendance/Api";
import TakeAttendanceFail from "../Form/TakeAttendanceFail";
import takePresentApi from "~/Core/Modules/TakeAttendance/Api/TakePresentApi";

const serialize = (obj) => {
  if (obj && obj !== {}) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(p + "=" + encodeURIComponent(obj[p]));
      }
    return `${str.join("&")}`;
  }
  return "";
};

const UserTable = ({ value }) => {
  const t = useTranslate();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});

  const openModel = (record) => {
    setVisible(true);
    setData(record);
  };
  const { confirm } = Modal;
  const handleCloseModal = () => {
    setVisible(false);

  };
  function showConfirm(record) {
    confirm({
      title: 'Do you want to mark present ?',
      onOk() {
        const value = {
          workScheduleId: record?.workSchedule?.id,
          workspaceId: record?.workspace?.id,
          employeeId: record?.employee?.id
        }
        takePresentApi
          .create(value)
          .then((res) => {

            if(res.code===3002){
              message.error(t("CORE.CAN.NOT.TAKE"));
              return;
            }
            if (res.code !== 200) {
              message.error(t("CORE.task_failure"));
              return;
            }

            message.success(t("CORE.ATTENDANCE.UPDATE.SUCCESS"));
            window.location.reload();
          })
          .catch(() => {
            message.error(t("CORE.error.system"));
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const defs = useMemo(() => [
    {
      title: t("CORE.EMPLOYEE.NAME"),
      dataIndex: "employee",
      className: "header-filter",
      key: "employee",
      fieldType: "text",
      sorter: true,
      width: 240,
      render: (text, record) => (
        <span>{record?.employee?.lastName} {record?.employee?.firstName}</span>
      ),

    },

    {
      title: t("CORE.SHIFT.NAME"),
      dataIndex: "shift",
      className: "header-filter",
      key: "contacts.startTime",
      fieldType: "type",
      sorter: true,
      width: 200,
      render: (text, record) => (
        <span>{record?.workSchedule?.shift?.name} ({moment(record?.workSchedule?.shift?.startTime, "HH:mm:ss").format("HH:mm")} - {moment(record?.workSchedule?.shift?.endTime, "HH:mm:ss").format("HH:mm")})</span>
      ),
    },
    {
      title: t("CORE.ATTENDANCE.STATUS"),
      dataIndex: "executor",
      className: "header-filter",
      key: "status",
      fieldType: "text",
      sorter: true,
      width: 200,
      render: (_, record) => {
        if (record.executor?.id === null || record.executor?.id !== record.employee.id) {
          return (
            <Tag color="red">{t("CORE.ATTENDANCE.ACTION.REJECT")}</Tag>
          )
        } else if (record.executor?.id === record.employee.id) {
          return (
            <Tag color="#87d068">{t("CORE.VIOLATION.ACTION.ACCEPT")}</Tag>
          )

        }
      },
    },
    {
      title: t("CORE.WORKSPACE.NAME"),
      dataIndex: "workspace",
      className: "header-filter",
      key: "contacts.updated_at",
      fieldType: "text",
      sorter: true,
      width: 300,
      render: (text, record) => (
        <span>{record?.workspace?.name}</span>
      ),
    },
    {
      title: t("CORE.ATTENDANCE.ACTION"),
      dataIndex: "none",
      className: "header-filter",
      key: "violation.action",
      fieldType: "none",
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
    if (role === "Branch Manager") {
      const isDisable = record.executor?.id === record.employee.id
      return (
        <>
          <Button onClick={() => { openModel(record) }} type="danger">
            {t("CORE.ATTENDANCE.ACTION.REJECT")}
          </Button>
          <Divider type="vertical" />
          <Button disabled={isDisable} onClick={() => { showConfirm(record) }} type="primary">
            {t("CORE.ATTENDANCE.ACTION.ACCEPT")}
          </Button>
        </>
      )
    }
    else {
      return (<></>)
    }
  }

  const defaultSorter = useMemo(() => ({ "Sort.Orders": "desc createdAt" }), []);

  const scroll = useMemo(() => ({
    x: 1240,
    y: `calc(100vh - (178px))`
  }), []);

  const filterKey = serialize({
    "Filter.FromDate": value
  })
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
        options={{ key: `${filterKey}&Filter.ToDate`, value: value }}
        refreshKey={value}
      />
      <Modal
        title={t("CORE.ATTENDANCE")}
        visible={visible}
        onCancel={handleCloseModal}
        footer={null}
        width="600px"

      ><TakeAttendanceFail data={data} /></Modal>
    </>
  );
};

export default UserTable;
