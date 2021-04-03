import React from "react";
import { useHistory } from "react-router-dom";

/* Components */
import Header from "~/Core/Modules/Cameras/Components/Header/Header";
import Table from "~/Core/Modules/Cameras/Components/Table/Table";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const UserManagement = () => {
  const history = useHistory();

  const t = useTranslate();

  const createCamera = () => {
    history.push("/cameras/create")
  }


  return (
    <div className="page-header branch">
      <Header
        breadcrumb={[{ title: t("CORE.CAMERA.MANAGEMENT.TITLE") }]}
        action={() => createCamera()}
        text={t("CORE.CAMERA.CREATE")}
        className="btn-yellow"
      />
      <Table t={t} />
    </div>
  );
};

export default UserManagement;
