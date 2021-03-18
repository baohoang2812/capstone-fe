import React, { useEffect, useState } from "react";


/* Antd */
import { Alert, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import Header from "~/Core/Modules/Report/Components/Header/Header";
import ReportViolation from "~/Core/Modules/Report/Components/Form/ReportViolation";

/* Api */
import reportApi from "~/Core/Modules/Report/Api";
import violationApi from "~/Core/Modules/Report/Api/Violation";
import { Link } from "@material-ui/core";

const ReportDetail = ({ match: { params } }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const t = useTranslate();


  const action = async () => {
    const res = await violationApi.exportViolation();
    const binaryData = [];
    binaryData.push(res);
    const url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/csv"}))
    const a = document.createElement('a');
    a.href = url;
    a.download =data.name+"_Violation.csv";
    document.body.appendChild(a);
    a.click();    
    a.remove();
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
          text={t("CORE.EXPORT")}
          className="btn-yellow"
          isDisabled={data?.status?.toLowerCase()==="done"?true:false}
          
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
