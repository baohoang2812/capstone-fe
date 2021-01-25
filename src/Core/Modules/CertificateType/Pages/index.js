import React from "react";
import { useHistory } from "react-router-dom";

/* Components */
import Header from "~/Core/Modules/CertificateType/Components/Header/Header";
import Table from "~/Core/Modules/CertificateType/Components/Table/Table";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const CertificateTypeManagement = () => {
  const history = useHistory();

  const t = useTranslate();

  const createCertificateType = () => {
    history.push("/certificateType/create")
  }


  return (
    <div className="page-header certificateType">
      <Header
        breadcrumb={[{ title: t("CORE.CERTIFICATE.TYPE.MANAGEMENT.TITLE") }]}
        action={() => createCertificateType()}
        text={t("CORE.CERTIFICATE.TYPE.CREATE.ACCOUNT")}
        className="btn-yellow"
      />
      <Table t={t} />
    </div>
  );
};

export default CertificateTypeManagement;
