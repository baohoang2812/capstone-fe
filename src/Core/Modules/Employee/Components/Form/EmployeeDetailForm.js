import "./style.less";

import React, { useState, useEffect } from "react";
import { Alert, Row, Col, Tabs, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Api */
import employeeApi from "~/Core/Modules/Employee/Api";
import accountApi from "~/Core/Modules/Employee/Api/Account";
import certificationApi from "~/Core/Modules/Employee/Api/Certification";

/* Component */
import AccountForm from "./AccountForm";
import EmployeeForm from "./EmployeeForm";
import CertificationForm from "./CertificationForm";

const { TabPane } = Tabs;

const EmployeeDetailForm = (props) => {
  const t = useTranslate();
  const [data, setData] = useState({});
  const [account, setAccount] = useState({});
  const [certifications, setCertifications] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    if (props.is_create) {
      // setLoading(false);
      //   setError(true);
    } else {
      (async () => {
        try {
          const res = await employeeApi.getOne(props.id);

          if (res.code !== 200) {
            message.error("CORE.MENU.message_error");
            setError(true);
            return;
          }
          const result = res.data?.result?.[0] || {};

          setData(result);
          console.log(result,"EmployeeID")

          const resAccount = await accountApi.getOne(result.id)

          if (resAccount.code !== 200) {
            message.error("CORE.MENU.message_error");
            setError(true);
            return;
          }
          setAccount(resAccount.data?.result?.[0] || {});

          setCertifications(result?.id);
        } catch (error) {
          setError(true);
        }
      })();

    }
  }, []);
  const callback = (key) => {
    console.log(key);
  };

  return (
    <Row type="flex" justify="center">
      <Col span={20}>
        <div className="div_custom">
          {error ? (
            <Alert type="error" message={t("CORE.task_failure")} />
          ) : (
            <Tabs onChange={callback} type="card">
              <TabPane tab={t("CORE.EMPLOYEE.TITLE.DETAIL")} key="1">
                <EmployeeForm {...props} data={data} />
              </TabPane>
              <TabPane disabled={props.is_create} tab={t("CORE.EMPLOYEE.TITLE.ACCOUNT")} key="2">
                <AccountForm {...props} employeeId={data.id} data={account} />
              </TabPane>
              <TabPane disabled={props.is_create} tab={t("CORE.CERTIFICATION.MANAGEMENT.TITLE")} key="3">
                <CertificationForm {...props} employeeId={data.id} data={certifications}/>
              </TabPane>
            </Tabs>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default EmployeeDetailForm;
