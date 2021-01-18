import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Spin, Alert, message } from "antd";
import jwt_decode from "jwt-decode";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import Header from "~/Core/Modules/Employee/Components/Header/Header";
import ProfileForm from "~/Core/Modules/Employee/Components/Form/ProfileForm";

/* Api */
import employeeApi from "~/Core/Modules/Employee/Api";

const Profile = ({ match: { params } }) => {
  const t = useTranslate();
  const history = useHistory();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const action = () => {
    history.push("/employee");
  };

  useEffect(() => {
    const token = localStorage.getItem("token" || "");
    const {
      payload: { employee_id },
    } = jwt_decode(token);

    employeeApi
      .getOne(employee_id)
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
  }, []);

  return (
    <>
      <div className="user">
        <Header
          breadcrumb={[
            {
              title: t("CORE.EMPLOYEE.PROFILE.TITLE"),
            },
          ]}
          action={action}
          text={t("CORE.back")}
          className="btn-yellow"
        />
        {error ? (
          <Alert type="error" message={t("CORE.task_failure")} />
        ) : (
          <ProfileForm data={data} />
        )}
      </div>
    </>
  );
};

export default Profile;
