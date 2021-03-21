import React from "react";
import { useHistory } from "react-router-dom";

/* Components */
import Header from "~/Core/Modules/Report/Components/Header/Header";
import Table from "~/Core/Modules/Report/Components/Table/Table";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const UserManagement = () => {
  const history = useHistory();

  const t = useTranslate();

  const createReport = () => {
    history.push("/report/create")
  }


  return (
    <div className="page-header report">
      <Header
        breadcrumb={[{ title: t("CORE.REPORT.MANAGEMENT.TITLE") }]}
        action={() => createReport()}
        text={t("CORE.REPORT.CREATE.ACCOUNT")}
        className="btn-yellow"
        isDisplay={false}
      />
      <Table t={t} />
    </div>
  );
};

export default UserManagement;