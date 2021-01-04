import React, { useState } from "react";
import { Button, Modal, Form, InputNumber, message } from "antd";

const ModalDelete = ({
  t,
  apiDelete,
  selectedRowKeys,
  refreshDataAfterDelete,
  afterDeleteSuccess,
  hiddenModal,
  visible,
}) => {

  /* State */
  const [disableOkModal, setDisableOkModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);

  const hiddenModalDelete = () => {
    setValue(null);
    setDisableOkModal(true);
    hiddenModal();
  }

  const onOkModalDelete = () => {
    setLoading(true);

    apiDelete(selectedRowKeys).then((res) => {
      if (res.status !== 200) {
        setLoading(false);
        if (Array.isArray(res.message)) {
          message.error(t("CORE.delete_failure"));
          return;
        } else if (res.message) {
          message.warning(res.message);
          return;
        }

        message.error(t("CORE.delete_failure"));
        return;
      }

      if (afterDeleteSuccess) { afterDeleteSuccess(selectedRowKeys); }
      refreshDataAfterDelete();
      hiddenModal();
      message.success(t("CORE.delete_success"));
    }).catch((e) => {
      console.log(e);
      message.error(t("CORE.delete_failure"));
      setLoading(false);
    })
  }

  const onChange = (value) => {
    setValue(value);
  
    if (value === selectedRowKeys.length) {
      setDisableOkModal(false);
    }
  }

  return (
    <Modal
      title={t("MODAL.TITLE.delete", "Delete {amount} rows", { amount: selectedRowKeys.length })}
      visible={visible}
      onCancel={hiddenModalDelete}
      className="modal-delete"
      footer={[
        <div className="actions" key="modal-actions">
          <Button
            style={{ marginLeft: 10 }}
            onClick={hiddenModalDelete}
            className="btn-outline"
          >
            {t("CORE.cancel")}
          </Button>
          <Button
            onClick={onOkModalDelete}
            className={`btn-orange${disableOkModal ? " unactive" : ""}`}
            disabled={disableOkModal}
            loading={loading}
          >
            {t("CORE.ok")}
          </Button>
        </div>
      ]}
    >
      <Form>
        <Form.Item label={t("MODAL.confirm_delete_many")} required={true}>
          <InputNumber
            value={value}
            style={{ width: "100%", marginTop: 5 }}
            placeholder={selectedRowKeys.length}
            onChange={onChange}
            size="large"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalDelete;
