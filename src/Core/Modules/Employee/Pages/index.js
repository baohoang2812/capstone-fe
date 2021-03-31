import React from "react";
import { useHistory } from "react-router-dom";

/* Components */
import Header from "~/Core/Modules/Employee/Components/Header/Header";
import Table from "~/Core/Modules/Employee/Components/Table/Table";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const UserManagement = () => {
  const history = useHistory();
  const t = useTranslate();
  const createEmployee = () => {
    history.push("/employee/detail/create")
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
    </div>
  );
};

export default UserManagement;
