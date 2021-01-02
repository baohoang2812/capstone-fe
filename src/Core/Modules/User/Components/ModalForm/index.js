import React from "react";
import { Modal } from "antd";

const ModalForm = (props) => {
  const { render, ...rest } = props;
  const { title, visibleModal, setVisibleModal } = rest;

  const handleCloseModal = () => {
    setVisibleModal(false);
  };

  return (
    <Modal
      title={title}
      visible={visibleModal}
      onCancel={handleCloseModal}
      footer={null}
    >
      {render(rest)}
    </Modal>
  );
};

ModalForm.defaultProps = {
  visibleModal: false,
  title: "Tác vụ",
};

export default ModalForm;
