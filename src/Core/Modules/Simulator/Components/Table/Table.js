import React, { useMemo } from "react";
import { Button } from "antd";
// import { Tag } from "antd";
import moment from "moment";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import AdminTable from "~/Core/Components/common/AdminTable";

/* Constants */
import { shifts as identity } from "~/Core/Modules/Simulator/Configs/Constants";

/* Api */
import contactApi from "~/Core/Modules/Simulator/Api";
/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";
import { useDispatch } from "react-redux";

const UserTable = () => {
  const t = useTranslate();
  /* Redux */
  const dispatch = useDispatch();

  const defs = useMemo(
    () => [
      {
        title: t("CORE.SIMULATOR.NAME"),
        dataIndex: "id",
        className: "header-filter",
        key: "id",
        fieldType: "none",
        sorter: true,
        width: 240,
        fixed: "left",
        render: (text) => `Table ${text}`,
      },
      {
        title: t("CORE.SIMULATOR.ACTION"),
        dataIndex: "isDisabled",
        className: "header-filter",
        key: "id",
        fieldType: "none",
        sorter: true,
        width: 240,
        fixed: "left",
        render: (text, record) => {
          if(record?.isDisabled) {
            return <Button onClick={() => enable(record?.id)} type="danger">{t("CORE.SIMULATOR.CHECKOUT")}</Button>;
          } else {
            return <Button onClick={() => disable(record?.id)} type="primary">{t("CORE.SIMULATOR.CHECKIN")}</Button>;
          }
        },
      },
      {
        title: t("CORE.SIMULATOR.CHARGE.CREATE"),
        dataIndex: "createdAt",
        className: "header-filter",
        key: "contacts.createdAt",
        fieldType: "none",
        sorter: true,
        width: 200,
        render: (text) => moment(text).format("DD/MM/YYYY"),
      },
      {
        title: t("CORE.SIMULATOR.CHARGE.UPDATE"),
        dataIndex: "updatedAt",
        className: "header-filter",
        key: "contacts.updated_at",
        fieldType: "none",
        sorter: true,
        render: (text, record) => {
          if (record?.updatedAt === null) {
            return <span></span>;
          } else {
            return moment(text).format("DD/MM/YYYY");
          }
        },
      },
    ],
    []
  );

  const enable = async (id) => {
    const res = await contactApi.enable(id);
    if(res.code === 200) {
      dispatch(update_identity_table_data_success(identity, {  id: id, column: "isDisabled", data: false }));
    }
  }

  const disable = async (id) => {
    const res = await contactApi.disable(id);
    if(res.code === 200) {
      dispatch(update_identity_table_data_success(identity, {  id: id, column: "isDisabled", data: true }));
    }
  }

  const defaultSorter = useMemo(
    () => ({ "Sort.Orders": "desc createdAt" }),
    []
  );

  const scroll = useMemo(
    () => ({
      x: 1040,
      y: `calc(100vh - (178px))`,
    }),
    []
  );

  return (
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
  );
};

export default UserTable;
