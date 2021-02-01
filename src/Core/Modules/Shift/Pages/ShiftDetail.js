import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

/* Antd */
import { Alert, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import Header from "~/Core/Modules/Shift/Components/Header/Header";
import ShiftDetailForm from "~/Core/Modules/Shift/Components/Form/ShiftDetailForm";

/* Api */
import shiftApi from "~/Core/Modules/Shift/Api";

const ShiftDetail = ({ match: { params } }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const t = useTranslate();
  const history = useHistory();

  const action = () => {
    history.push("/shift");
  };

  useEffect(() => {
    if (params.id !== "create") {
      (async () => {
        try {
          const res = await shiftApi.getOne(params.id);
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
              title: t("CORE.SHIFT.MANAGEMENT.TITLE"),
              link: "/shift",
            },
            {
              title:
                params.id === "create"
                  ? t("CORE.SHIFT.CREATE.ACCOUNT")
                  : t("CORE.SHIFT.UPDATE.ACCOUNT"),
            },
          ]}
          action={action}
          text={t("CORE.back")}
          className="btn-yellow"
        />
        {error ? (
          <Alert type="error" message={t("CORE.task_failure")} />
        ) : (
          <ShiftDetailForm
            action={action}
            is_create={params.id === "create"}
            data={data}
          />
        )}
      </div>
    </>
  );
};

export default ShiftDetail;
