import React from "react";
import { useHistory } from "react-router-dom";

/* Components */
import Header from "~/Core/Modules/Regulation/Components/Header/Header";
import Table from "~/Core/Modules/Regulation/Components/Table/Table";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
import jwt_decode from "jwt-decode";
const UserManagement = () => {
  const history = useHistory();

  const t = useTranslate();

  const createBranch = () => {
    history.push("/regulation/create")
  }
  const token = localStorage.getItem("token" || "");
  const {
    roleName: role,
  } = jwt_decode(token);

  return (
    <div className="page-header regulation">
      <Header
        breadcrumb={[{ title: t("CORE.REGULATION.MANAGEMENT.TITLE") }]}
        action={() => createBranch()}
        isDisplay={role==='Admin'}
        text={t("CORE.REGULATION.CREATE.ACCOUNT")}
        className="btn-yellow"
      />
      <Table t={t} />
    </div>
  );
};

export default UserManagement;