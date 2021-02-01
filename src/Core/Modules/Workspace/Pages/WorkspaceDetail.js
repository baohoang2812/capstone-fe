import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

/* Antd */
import { Alert, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import Header from "~/Core/Modules/Workspace/Components/Header/Header";
import WorkspaceDetailForm from "~/Core/Modules/Workspace/Components/Form/WorkspaceDetailForm";

/* Api */
import workspaceApi from "~/Core/Modules/Workspace/Api";

const WorkspaceDetail = ({ match: { params } }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const t = useTranslate();
  const history = useHistory();

  const action = () => {
    history.push("/workspace");
  };

  useEffect(() => {
    if (params.id !== "create") {
      (async () => {
        try {
          const res = await workspaceApi.getOne(params.id);
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
              title: t("CORE.WORKSPACE.MANAGEMENT.TITLE"),
              link: "/workspace",
            },
            {
              title:
                params.id === "create"
                  ? t("CORE.WORKSPACE.CREATE.ACCOUNT")
                  : t("CORE.WORKSPACE.UPDATE.ACCOUNT"),
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
          />
        )}
      </div>
    </>
  );
};

export default WorkspaceDetail;
