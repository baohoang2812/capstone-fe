import React from "react";
import { useHistory } from "react-router-dom";

/* Components */
import Header from "~/Core/Modules/Position/Components/Header/Header";
import Table from "~/Core/Modules/Position/Components/Table/Table";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const UserManagement = () => {
  const history = useHistory();

  const t = useTranslate();

  const createPosition = () => {
    history.push("/position/create")
  }


  return (
    <div className="page-header position">
      <Header
        breadcrumb={[{ title: t("CORE.POSITION.MANAGEMENT.TITLE") }]}
        action={() => createPosition()}
        text={t("CORE.POSITION.CREATE.ACCOUNT")}
        className="btn-yellow"
      />
      <Table t={t} />
    </div>
  );
};

export default UserManagement;