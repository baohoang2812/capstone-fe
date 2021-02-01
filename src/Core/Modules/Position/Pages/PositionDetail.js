import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

/* Antd */
import { Alert, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import Header from "~/Core/Modules/Position/Components/Header/Header";
import PositionDetailForm from "~/Core/Modules/Position/Components/Form/PositionDetailForm";

/* Api */
import positionApi from "~/Core/Modules/Position/Api";

const PositionDetail = ({ match: { params } }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const t = useTranslate();
  const history = useHistory();

  const action = () => {
    history.push("/position");
  };

  useEffect(() => {
    if (params.id !== "create") {
      (async () => {
        try {
          const res = await positionApi.getOne(params.id);
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
              title: t("CORE.POSITION.MANAGEMENT.TITLE"),
              link: "/position",
            },
            {
              title:
                params.id === "create"
                  ? t("CORE.POSITION.CREATE.ACCOUNT")
                  : t("CORE.POSITION.UPDATE.ACCOUNT"),
            },
          ]}
          action={action}
          text={t("CORE.back")}
          className="btn-yellow"
        />
        {error ? (
          <Alert type="error" message={t("CORE.task_failure")} />
        ) : (
          <PositionDetailForm
            action={action}
            is_create={params.id === "create"}
            data={data}
          />
        )}
      </div>
    </>
  );
};

export default PositionDetail;
