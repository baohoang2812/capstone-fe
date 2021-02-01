import React from "react";
import { useHistory } from "react-router-dom";

/* Components */
import Header from "~/Core/Modules/Shift/Components/Header/Header";
import Table from "~/Core/Modules/Shift/Components/Table/Table";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const ShiftManagement = () => {
  const history = useHistory();

  const t = useTranslate();

  const createShift = () => {
    history.push("/shift/create")
  }


  return (
    <div className="page-header shift">
      <Header
        breadcrumb={[{ title: t("CORE.SHIFT.MANAGEMENT.TITLE") }]}
        action={() => createShift()}
        text={t("CORE.SHIFT.CREATE.ACCOUNT")}
        className="btn-yellow"
      />
      <Table t={t} />
    </div>
  );
};

export default ShiftManagement;