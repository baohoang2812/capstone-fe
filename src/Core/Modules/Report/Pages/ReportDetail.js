import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

/* Antd */
import { Alert, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import Header from "~/Core/Modules/Report/Components/Header/Header";
import ReportViolation from "~/Core/Modules/Report/Components/Form/ReportViolation";

/* Api */
import reportApi from "~/Core/Modules/Report/Api";

const ReportDetail = ({ match: { params } }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const t = useTranslate();
  const history = useHistory();

  const action = () => {
    history.push("/report");
  };

  useEffect(() => {
    if (params.id !== "create") {
      (async () => {
        try {
          const res = await reportApi.getOne(params.id);
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
              title: t("CORE.REPORT.MANAGEMENT.TITLE"),
              link: "/report",
            },
            {
              title:
                params.id === "create"
                  ? t("CORE.REPORT.CREATE.ACCOUNT")
                  : t("CORE.REPORT.DETAIL"),
            },
          ]}
          action={action}
          text={t("CORE.back")}
          className="btn-yellow"
        />
        {error ? (
          <Alert type="error" message={t("CORE.task_failure")} />
        ) : (
          <ReportViolation
            action={action}
            is_create={params.id === "create"}
            data={data}
          />
        )}
      </div>
    </>
  );
};

export default ReportDetail;
