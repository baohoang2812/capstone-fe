import React from "react";
import { useHistory } from "react-router-dom";

/* Components */
import Header from "~/Core/Modules/Violation/Components/Header/Header";
import Table from "~/Core/Modules/Violation/Components/Table/TableViolation";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const UserManagement = () => {
  const history = useHistory();

  const t = useTranslate();

  const createViolation = () => {
    history.push("/violation/create")
  }


  return (
    <div className="page-header violation">
      <Header
        breadcrumb={[{ title: t("CORE.VIOLATION.MANAGEMENT.TITLE") }]}
        action={() => createViolation()}
        text={t("CORE.VIOLATION.CREATE.ACCOUNT")}
        className="btn-yellow"
      />
      <Table t={t} />
    </div>
  );
};

export default UserManagement;