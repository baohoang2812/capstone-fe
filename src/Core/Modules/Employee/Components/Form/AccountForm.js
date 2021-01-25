import "./style.less";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Form, Input, Button, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { employees as identity } from "~/Core/Modules/Employee/Configs/constants";

/* Api */
import employeeApi from "~/Core/Modules/Employee/Api";

const AccountForm = ({ form, action, data, is_create }) => {
  const t = useTranslate();
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  /* Redux */
  const dispatch = useDispatch();

  /* State */
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFieldsValue({
      username: data?.username,
    });
  }, [data]);

  const onConfirm = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        const newValues = {
          ...values,
          birthDate: values["birthDate"].format("YYYY-MM-DD"),
          imagePath: values?.["imagePath"]?.file?.response?.url,
        };
        console.log(newValues);
        newValues.branchManagerId = 1;
        newValues.status = "test";
        const { username, hash_password, ...employee } = newValues;
        setLoading(false);
        const objReq = {
          employee,
          account: {
            username,
            hash_password,
          },
        };
        console.log(objReq);
        if (is_create) {
          employeeApi
            .create(objReq)
            .then((res) => {
              setLoading(false);

              if (res.status !== 200) {
                message.error(t("CORE.task_failure"));
                return;
              }

              dispatch(
                update_identity_table_data_success(identity, res.data.employee)
              );
              message.success(t("CORE.EMPLOYEE.CREATE.SUCCESS"));
              action();
            })
            .catch(() => {
              message.error(t("CORE.error.system"));
            });
        } else {
          objReq.employee.id = data.employee.id;
          employeeApi.update(objReq).then((res) => {
            setLoading(false);

            if (res.status !== 200) {
              message.error(t("CORE.task_failure"));
              return;
            }

            dispatch(
              update_identity_table_data_success(identity, res.data.employee)
            );
            message.success(t("CORE.EMPLOYEE.UPDATE.SUCCESS"));
            action();
          });
        }
      }
    });
  };

  return (
    <Form onSubmit={onConfirm}>
      <Row type="flex" justify="center">
        <Col span={12}>
          <Form.Item label={t("CORE.EMPLOYEE.USERNAME")}>
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Please input username!",
                  whitespace: false,
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={12}>
          <Form.Item label={t("CORE.EMPLOYEE.PASSWORD")} hasFeedback>
            {getFieldDecorator("hash_password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!",
                },
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
  );
};

export default Form.create({ name: "Account_Detail" })(AccountForm);
