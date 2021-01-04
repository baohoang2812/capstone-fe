import React from 'react';
import { Modal, Button } from 'antd';
import { FormattedMessage } from 'react-intl';

const PopupDelete = ({ onCancel, onOk, text, visible, loading }) => (
  <Modal
    title={<FormattedMessage  id="CORE.confirm" />}
    onCancel={onCancel}
    visible={visible}
    wrapClassName="modal-delete"
    footer={[
      <div key="actions" className="actions">
        <Button className="btn-outline" style={{ marginLeft: "10px" }} onClick={onCancel}>
          <FormattedMessage  id="CORE.cancel" />
        </Button>
        <Button className={`btn-orange`} onClick={onOk} loading={loading}>
          <FormattedMessage  id="CORE.ok" />
        </Button>
      </div>
    ]}
  >
    {text}
  </Modal>
)

export default PopupDelete;
