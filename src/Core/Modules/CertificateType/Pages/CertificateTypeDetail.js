import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Alert, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import Header from "~/Core/Modules/CertificateType/Components/Header/Header";
import EmployeeDetailForm from "~/Core/Modules/CertificateType/Components/Form/CertificateTypeDetailForm";

/* Api */
import certificateTypeApi from "~/Core/Modules/CertificateType/Api";

const CertificateTypeDetail = ({ match: { params } }) => {
  const t = useTranslate();
  const history = useHistory();
  const [data, setData] = useState({});
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const action = () => {
    history.push("/certificateType");
  };

  useEffect(() => {
    console.log(JSON.stringify(params));
    if (params.id === "create") {
      // setLoading(false);
      //   setError(true);
    } else {
        certificateTypeApi
        .getOne(params.id)
        .then((res) => {
          // setLoading(false);
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
              title: t("CORE.CERTIFICATE.TYPE.MANAGEMENT.TITLE"),
              link: "/employee",
            },
            {
              title:
                params.id === "create"
                  ? t("CORE.CERTIFICATE.TYPE.CREATE.ACCOUNT")
                  : t("CORE.CERTIFICATE.TYPE.UPDATE.ACCOUNT"),
            },
          ]}
          action={action}
          text={t("CORE.back")}
          className="btn-yellow"
        />
        {error ? (
          <Alert type="error" message={t("CORE.task_failure")} />
        ) : (
          <EmployeeDetailForm
            action={action}
            data={data}
            is_create={params.id === "create"}
          />
        )}
      </div>
    </>
  );
};

export default CertificateTypeDetail;
