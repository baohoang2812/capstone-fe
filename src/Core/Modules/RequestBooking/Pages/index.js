import React from "react";
import { useHistory } from "react-router-dom";

/* Components */
import Header from "~/Core/Modules/RequestBooking/Components/Header/Header";
import Table from "~/Core/Modules/RequestBooking/Components/Table/Table";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const UserManagement = () => {
  const history = useHistory();

  const t = useTranslate();

  const createWorkspace = () => {
    history.push("/request-booking/create")
  }


  return (
    <div className="page-header workspace">
      <Header
        breadcrumb={[{ title: t("REQUEST.BOOKING.TITLE") }]}
        action={() => createWorkspace()}
        text={t("REQUEST.BOOKING.BUTTON.TITLE")}
        className="btn-yellow"
      />
      <Table t={t} />
    </div>
  );
};

export default UserManagement;