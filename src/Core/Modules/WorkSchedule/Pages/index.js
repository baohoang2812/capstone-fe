import React from "react";
import { useHistory } from "react-router-dom";

/* Components */
import Header from "~/Core/Modules/WorkSchedule/Components/Header/Header";
import Table from "~/Core/Modules/WorkSchedule/Components/Table/Table";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const UserManagement = () => {
  const history = useHistory();

  const t = useTranslate();

  const createWorkSchedule = () => {
    history.push("/workSchedule/create")
  }


  return (
    <div className="page-header workSchedule">
      <Header
        breadcrumb={[{ title: t("CORE.WORKSCHEDULE.MANAGEMENT.TITLE") }]}
        action={() => createWorkSchedule()}
        text={t("CORE.WORKSCHEDULE.CREATE.ACCOUNT")}
        className="btn-yellow"
      />
      <Table t={t} />
    </div>
  );
};

export default UserManagement;