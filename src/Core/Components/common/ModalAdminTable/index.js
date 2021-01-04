import "./index.less";

import React, { useState, useCallback, useMemo } from "react";
import { Modal, Button } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Core */
import AdminTable from "~/Core/Components/common/AdminTable";

const ModalAdminTable = ({
  defs,
  scroll,
  widthModal,
  title,
  btnText,
  mode,
  api,
  identity,
  onSelected,
  getListMethod,
  notInKeys,
  notInFilterKey,
}) => {
  const t = useTranslate();

  /* State */
  const [visible, setVisible] = useState(false);
  const [rowKeys, setRowKeys] = useState([]);

  const showModal = () => {
    setVisible(true);
  }

  const hiddenModal = () => {
    setVisible(false);
  }

  const onOk = () => {
    setVisible(false);
    if (rowKeys.length !== 0) {
      onSelected(rowKeys);
      setRowKeys([])
    }
  }

  const rowKeysChange = useCallback((ids) => {
    setRowKeys(ids);
  }, [])

  const whereAnd = useMemo(() => ({ [notInFilterKey || "id"]: { $nin: notInKeys } }), [notInKeys, notInFilterKey]);
  const method = useMemo(() => ({ list: getListMethod }), [getListMethod]);

  return (
    <>
      <Button onClick={showModal} type="dashed" icon="plus">{btnText || "Thêm"}</Button>
      <Modal
        width={widthModal}
        title={title}
        visible={visible}
        onCancel={hiddenModal}
        onOk={onOk}
        className="modal-select"
        style={{ top: 27.5 }}
        footer={[
          <div className="actions" key="modal-actions">
            <Button
              style={{ marginLeft: 10 }}
              onClick={hiddenModal}
              className="btn-outline"
            >
              Hủy
            </Button>
            <Button
              onClick={onOk}
              className="btn-orange"
            >
              Chọn
            </Button>
          </div>
        ]}
      >
        <AdminTable
          defs={defs}
          showCheckbox={true}
          showHeaderAction={false}
          scroll={scroll}
          modeRowKeys={mode}
          api={api}
          identity={identity}
          rowKeys={rowKeys}
          rowKeysChange={rowKeysChange}
          whereAnd={whereAnd}
          method={method}
        />
      </Modal>
    </>
  );
}

ModalAdminTable.defaultProps = {
  defs: [],
  mode: "checkbox",
  scroll: { y: `calc(100vh - (178px))` },
  getListMethod: "getList",
  notInKeys: [],
  onSelected: () => {}
}

export default ModalAdminTable;
