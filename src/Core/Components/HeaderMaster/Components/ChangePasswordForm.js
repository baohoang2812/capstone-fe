import "./style.less";

import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import {  Row, Col, Form, Input, Button, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
// import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

// /* Constants */
// import { employees as identity } from "~/Core/Modules/Employee/Configs/constants";

/* Api */
import accountApi from "~/Core/Api/ChangePassword";
import { logout } from "~/Core/utils/helper/authenticate";

const AccountForm = ({ form, action, data, is_create }) => {
  // const [loadingDropdown, setLoadingDropdown] = useState(false);
  const t = useTranslate();
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  /* Redux */
  // const dispatch = useDispatch();

  /* State */
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const account_info = JSON.parse(localStorage.getItem("account_info"));
    setFieldsValue({
      username: account_info.username,
    });
  }, []);


  const onConfirm = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        const { username,password,newPassword } = values;
        const objReq = {
          username,
          password,
          newPassword
        };
          accountApi.update(objReq).then((res) => {
            setLoading(false);
            if(res.code===3003){
              message.error(t("CORE.TASK.INVALID.PASSWORD"));
              return;
            }
            if (res.code === 200) {
              message.success(t("CORE.ACCOUNT.UPDATE.SUCCESS"));
              setTimeout(()=>{
                logout()
              }, 2000)
            }
            else{
              message.error(t("CORE.task_failure"));
             
            }
              
            
            // dispatch(update_identity_table_data_success(identity, res.data));
          
          });
        }
      }
    );
  };

  return (
    // <Spin spinning={loadingDropdown}>
      <Form onSubmit={onConfirm}>
        <Row type="flex" justify="center">
          <Col span={12}>
            <Form.Item label={t("CORE.EMPLOYEE.USERNAME")}>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: (<>{t("CORE.ACCOUNT.ALERT.USERNAME")}</>),
                    whitespace: false,
                  },
                  {
                    max:255,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.MAX.LENGTH")}</>),
                  }
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={12}>
            <Form.Item label={t("CORE.EMPLOYEE.PASSWORD")} hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: (<>{t("CORE.ACCOUNT.ALERT.PASSWORD")}</>),
                  },
                  {
                    min:8,
                    message:(<>{t("CORE.ACCOUNT.PASSWORD.MIN.LENGTH")}</>),
                  },
                  {
                    max:255,
                    message:(<>{t("CORE.EMPLOYEE.ALERT.MAX.LENGTH")}</>),
                  }
                ],
              })(<Input.Password />)}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={12}>
            <Form.Item label={t("CORE.EMPLOYEE.NEW.PASSWORD")} hasFeedback>
              {getFieldDecorator("newPassword", {
                rules: [
                  {
                    required: true,
                    message: (<>{t("CORE.ACCOUNT.ALERT.PASSWORD")}</>),
                  },
                  {
                    min:8,
                    message:(<>{t("CORE.ACCOUNT.PASSWORD.MIN.LENGTH")}</>),
                  },
                  {
                    max:255,
                    message:(<>{t("CORE.EMPLOYEE.ALERT.MAX.LENGTH")}</>),
                  }
                ],
              })(<Input.Password />)}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <div className="btn-group">
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="btn-yellow btn-right"
                style={{ float: "right" }}
                onClick={onConfirm}
              >
                {t("CORE.confirm")}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    // </Spin>
  );
};
export default Form.create({ name: "Account_Detail" })(AccountForm);
