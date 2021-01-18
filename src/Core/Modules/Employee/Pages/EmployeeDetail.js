import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Spin, Alert, Icon, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import Header from "~/Core/Modules/Employee/Components/Header/Header";
import EmployeeDetailForm from "~/Core/Modules/Employee/Components/Form/EmployeeDetailForm";


/* Api */
import employeeApi from "~/Core/Modules/Employee/Api";


const EmployeeDetail = ({ match: { params } }) => {
  const t = useTranslate();
  const history = useHistory();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const action = () => {
    history.push("/employee");
  };

  useEffect(() => {
      console.log(JSON.stringify(params));
    if (params.id === "create") {
      setLoading(false);
    //   setError(true);
    } else {
        employeeApi
        .getOne(params.id)
        .then((res) => {
          setLoading(false);
          if (res.status !== 200) {
            message.error("CORE.MENU.message_error");
            setError(true);
            return;
          }
          setData(res.data);
        })
        .catch(() => {
          setError(true);
        });
    }
  }, []);

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
                  : t("CORE.EMPLOYEE.UPDATE.ACCOUNT"),
            },
          ]}
          action={action}
          text={t("CORE.back")}
          className="btn-yellow"
        />
        {error ? (
          <Alert type="error" message={t("CORE.task_failure")} />
        ) : (
          <Spin spinning={loading}>
            <EmployeeDetailForm action={action} data={data} is_create={params.id === "create"} />
          </Spin>
        )}
      </div>
    </>
  );
};

export default EmployeeDetail;