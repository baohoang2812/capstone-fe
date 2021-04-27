import React, { useMemo, useState } from "react";
import moment from "moment";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
import { Link } from "react-router-dom";
/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";
import ImageThumbnail from "~/Core/Components/common/ImageThumbnail";
/* Constants */
import { timekeeping as identity } from "~/Core/Modules/TakeAttendance/Configs/Constants2";
import { Modal } from "antd";
/* Api */
import contactApi from "~/Core/Modules/TakeAttendance/Api/TimekeepingApi";
import TimeKeepDetail from "../Form/TimeKeepDetail";

const UserTable = ({ value }) => {
  const t = useTranslate();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();

  const openModel = (record) => {
    setVisible(true);
    setData(record.employee.id);
  };
  const handleCloseModal = () => {
    setVisible(false);
  };

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

  const defs = useMemo(
    () => [
      {
        title: t("CORE.EMPLOYEE.IMAGE.PATH"),
        dataIndex: "imagePath",
        className: "header-filter header-image",
        key: "imagePath",
        fieldType: "none",
        sorter: true,
        width: 200,
        render: (_, record) => {
          return <ImageThumbnail src={record?.employee?.imagePath} />;
        },
      },
      {
        title: t("CORE.EMPLOYEE.NAME"),
        dataIndex: "employee",
        className: "header-filter",
        key: "employee",
        fieldType: "text",
        sorter: true,
        width: 440,
        render: (text, record) => (
          <Link onClick={() => openModel(record)}>
            {record?.employee?.lastName} {record?.employee?.firstName}
          </Link>
        ),
      },
      {
        title: t("CORE.EMPLOYEE.POSITION"),
        dataIndex: "position",
        className: "header-filter",
        key: "contacts.startTime",
        fieldType: "type",
        sorter: true,
        width: 300,
        render: (text, record) => <span>{record?.position?.name}</span>,
      },
      {
        title: t("CORE.DURATION"),
        dataIndex: "workspace",
        className: "header-filter",
        key: "contacts.updated_at",
        fieldType: "text",
        sorter: true,
        render: (text, record) => (
          <span>{record?.totalWorkingHours} hours</span>
        ),
      },
    ],
    []
  );

  const defaultSorter = useMemo(
    () => ({ "Sort.Orders": "desc createdAt" }),
    []
  );

  const scroll = useMemo(
    () => ({
      x: 1240,
      y: `calc(100vh - (178px))`,
    }),
    []
  );

  const query = serialize({
    FromDate: value[0],
  });
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
        options={{ key: `${query}&ToDate`, value: value[1] }}
        refreshKey={JSON.stringify(value)}
      />
      <Modal
        title={t("CORE.TIMEKEEPING.DETAIL")}
        visible={visible}
        onCancel={handleCloseModal}
        footer={null}
        width="900px"
      >
        <TimeKeepDetail
          data={data}
          value={moment(value).format("YYYY-MM-DD")}
        />
      </Modal>
    </>
  );
};

export default UserTable;
