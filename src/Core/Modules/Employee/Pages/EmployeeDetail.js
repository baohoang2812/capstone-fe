import React from "react";
import { useHistory } from "react-router-dom";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import Header from "~/Core/Modules/Employee/Components/Header/Header";
import EmployeeDetailForm from "~/Core/Modules/Employee/Components/Form/EmployeeDetailForm";


const EmployeeDetail = ({ match: { params } }) => {
  const t = useTranslate();
  const history = useHistory();

  const action = () => {
    history.push("/employee");
  };

  return (
    <>
      <div className="user">
        <Header
          breadcrumb={[
            {
              title: t("CORE.EMPLOYEE.MANAGEMENT.TITLE"),
              link: "/employee",
            },
            {
              title:
                params.id === "create"
                  ? t("CORE.EMPLOYEE.CREATE.ACCOUNT")
                  : t
                  ("CORE.EMPLOYEE.UPDATE.ACCOUNT"),
            },
          ]}
          action={action}
          text={t("CORE.back")}
          className="btn-yellow"
        />
      
          <EmployeeDetailForm
            action={action}
            is_create={params.id === "create"}
            id={params.id}
          />
      </div>
    </>
  );
};

export default EmployeeDetail;
