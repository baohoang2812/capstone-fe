import React, { useState } from "react";
import { useHistory } from "react-router-dom";

/* Components */
import Header from "~/Core/Modules/Employee/Components/Header/HeaderCertification";
import Table from "~/Core/Modules/Employee/Components/Table/TableCertification";
import CertificationDetail from "~/Core/Modules/Employee/Components/Form/CertificationDetail";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
import { Modal } from "antd";

const CertificationForm = () => {
  const [visible, setVisible] = useState(false);

  const t = useTranslate();

  const createEmployee = () => {
    setVisible(true);
  }

  const handleCloseModal = () => {
    setVisible(false);
  }

  return (
    <div className="page-header employee">
      <Header
        breadcrumb={[{ title: t("CORE.EMPLOYEE.MANAGEMENT.TITLE") }]}
        action={() => createEmployee()}
        text={t("CORE.EMPLOYEE.CREATE.ACCOUNT")}
        className="btn-yellow"
      />
      <Table t={t} />
      <Modal
      title={ t("CORE.EMPLOYEE.MANAGEMENT.TITLE") }
      visible={visible}
      onCancel={handleCloseModal}
      footer={null}
    >
      <CertificationDetail/>
    </Modal>
    </div>
  );
};

export default CertificationForm;
