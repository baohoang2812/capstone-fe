import React, { useState } from "react";

import { Icon } from "antd";
/* Components */
import Header from "~/Core/Modules/User/Components/Header/ModalBtn";
import Table from "~/Core/Modules/User/Components/Table";
import FormCreateUser from "~/Core/Modules/User/Components/ModalForm/FormCreateUser";
import ModalForm from "~/Core/Modules/User/Components/ModalForm";

import { userSvg } from "~/Core/Modules/User/assets/svg";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const UserManagement = () => {
  const [visible, setVisible] = useState(false);

  const t = useTranslate();

  return (
    <div className="page-header user">
      <Header
        breadcrumb={[{ title: t("CORE.USER.MANAGEMENT.TITLE") }]}
        icon={<Icon component={userSvg} />}
        action={() => setVisible(true)}
        text={t("CORE.USER.CREATE.ACCOUNT")}
        className="btn-yellow"
      />
      <Table t={t} />
      <ModalForm
        visibleModal={visible}
        setVisibleModal={setVisible}
        title={t("CORE.USER.CREATE.ACCOUNT")}
        render={(props) => (
          <FormCreateUser
            {...props}
          />
        )}
      />
    </div>
  );
};

export default UserManagement;
