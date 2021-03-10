import React from "react";
import { useHistory } from "react-router-dom";

/* Components */
import Header from "~/Core/Modules/Workspace/Components/Header/Header";
import Table from "~/Core/Modules/Workspace/Components/Table/Table";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const UserManagement = () => {
  const history = useHistory();

  const t = useTranslate();

  const createWorkspace = () => {
    history.push("/workspace/create")
  }


  return (
    <div className="page-header workspace">
      <Header
        breadcrumb={[{ title: t("CORE.WORKSPACE.MANAGEMENT.TITLE") }]}
        action={() => createWorkspace()}
        text={t("CORE.WORKSPACE.CREATE.ACCOUNT")}
        className="btn-yellow"
      />
      <Table t={t} />
    </div>
  );
};

export default UserManagement;