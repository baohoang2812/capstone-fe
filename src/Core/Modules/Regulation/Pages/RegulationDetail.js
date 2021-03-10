import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

/* Antd */
import { Alert, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import Header from "~/Core/Modules/Regulation/Components/Header/Header";
import RegulationDetailForm from "~/Core/Modules/Regulation/Components/Form/RegulationDetailForm";

/* Api */
import regulationApi from "~/Core/Modules/Regulation/Api";

const RegulationDetail = ({ match: { params } }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const t = useTranslate();
  const history = useHistory();

  const action = () => {
    history.push("/regulation");
  };

  useEffect(() => {
    if (params.id !== "create") {
      (async () => {
        try {
          const res = await regulationApi.getOne(params.id);
          if (res.code !== 200) {
            message.error("CORE.MENU.message_error");
            setError(true);
            return;
          }

          const data = res?.data?.result?.[0] || {};
          setData(data);
        } catch (error) {
          setError(true);
        }
      })();
    }
  }, []);

  return (
    <>
      <div className="user">
        <Header
          breadcrumb={[
            {
              title: t("CORE.REGULATION.MANAGEMENT.TITLE"),
              link: "/regulation",
            },
            {
              title:
                params.id === "create"
                  ? t("CORE.REGULATION.CREATE.ACCOUNT")
                  : t("CORE.REGULATION.UPDATE.ACCOUNT"),
            },
          ]}
          action={action}
          text={t("CORE.back")}
          className="btn-yellow"
        />
        {error ? (
          <Alert type="error" message={t("CORE.task_failure")} />
        ) : (
          <RegulationDetailForm
            action={action}
            is_create={params.id === "create"}
            data={data}
          />
        )}
      </div>
    </>
  );
};

export default RegulationDetail;
