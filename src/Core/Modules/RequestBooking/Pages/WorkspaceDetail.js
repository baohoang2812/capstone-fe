import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

/* Antd */
import { Alert, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import Header from "~/Core/Modules/Workspace/Components/Header/Header";

/* Api */
import requestBookingApi from "~/Core/Modules/RequestBooking/Api";
import WorkspaceDetailForm from "../Components/Form/WorkspaceDetailForm";

const WorkspaceDetail = ({ match: { params } }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const t = useTranslate();
  const history = useHistory();

  const action = () => {
    history.push("/request-booking");
  };

  useEffect(() => {
    if (params.id !== "create") {
      (async () => {
        try {
          const res = await requestBookingApi.getOne(params.id);
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
              title: t("REQUEST.BOOKING.TITLE"),
              link: "/request-booking",
            },
            {
              title:
                params.id === "create"
                  ? t("REQUEST.BOOKING.CREATE.TITLE")
                  : t("REQUEST.BOOKING.UPDATE.TITLE"),
            },
          ]}
          action={action}
          text={t("CORE.back")}
          className="btn-yellow"
        />
        {error ? (
          <Alert type="error" message={t("CORE.task_failure")} />
        ) : (
          <WorkspaceDetailForm
            action={action}
            is_create={params.id === "create"}
            data={data}
            id={params.id}
          />
        )}
      </div>
    </>
  );
};

export default WorkspaceDetail;
