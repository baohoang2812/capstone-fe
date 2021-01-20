import React from "react";
import { useHistory } from "react-router-dom";

/* Components */
import Header from "~/Core/Modules/Branch/Components/Header/Header";
import Table from "~/Core/Modules/Branch/Components/Table/Table";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const UserManagement = () => {
  const history = useHistory();

  const t = useTranslate();

  const createBranch = () => {
    history.push("/branch/create")
  }


  return (
    <div className="page-header branch">
      <Header
        breadcrumb={[{ title: t("CORE.BRANCH.MANAGEMENT.TITLE") }]}
        action={() => createBranch()}
        text={t("CORE.BRANCH.CREATE.ACCOUNT")}
        className="btn-yellow"
      />
      <Table t={t} />
    </div>
  );
};

export default UserManagement;
