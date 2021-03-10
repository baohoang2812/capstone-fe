import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Alert, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import Header from "~/Core/Modules/Branch/Components/Header/Header";
import BranchDetailForm from "~/Core/Modules/Branch/Components/Form/BranchDetailForm";

/* Api */
import branchApi from "~/Core/Modules/Branch/Api";

const BranchDetail = ({ match: { params } }) => {
  const t = useTranslate();
  const history = useHistory();
  const [data, setData] = useState({});
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const action = () => {
    history.push("/branch");
  };

  useEffect(() => {
    console.log(JSON.stringify(params));
    if (params.id === "create") {
      // setLoading(false);
      //   setError(true);
    } else {
        branchApi
        .getOne(params.id)
        .then((res) => {
          // setLoading(false);
          if (res.code !== 200) {
            message.error("CORE.MENU.message_error");
            setError(true);
            return;
          }
          const data = res?.data?.result?.[0] || {};
          setData(data);
        })
        .catch(() => {
          setError(true);
        });
    }
  }, []);
  ;

  return (
    <>
      <div className="user">
        <Header
          breadcrumb={[
            {
              title: t("CORE.BRANCH.MANAGEMENT.TITLE"),
              link: "/branch",
            },
            {
              title:
                params.id === "create"
                  ? t("CORE.BRANCH.CREATE.ACCOUNT")
                  : t("CORE.BRANCH.UPDATE.ACCOUNT"),
            },
          ]}
          action={action}
          text={t("CORE.back")}
          className="btn-yellow"
        />
        {error ? (
          <Alert type="error" message={t("CORE.task_failure")} />
        ) : (
          <BranchDetailForm
            action={action}
            data={data}
            is_create={params.id === "create"}
          />
        )}
      </div>
    </>
  );
};

export default BranchDetail;
