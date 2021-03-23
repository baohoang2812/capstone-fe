import "./style.less";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { 
  Select, 
  Row, 
  Col, 
  Form, 
  Input, 
  Button, 
  message, 
  Spin 
} from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";
/* Constants */
import { employees as identity } from "~/Core/Modules/Employee/Configs/constants";
/* Api */
import accountApi from "~/Core/Modules/Employee/Api/Account";
import roleApi from "~/Core/Modules/Employee/Api/Role";

const { Option } = Select;
const AccountForm = ({ form, employeeId, action, data, is_create }) => {
  /* Redux */
  const dispatch=useDispatch();
  /* State */
  const [loading, setLoading]= useState(false);
  const [loadingDropdown, setLoadingDropdown]=useState(false);
  const [listRole, setRole]=useState([]);
  const t=useTranslate();
  const { getFieldDecorator, validateFields, setFieldsValue }= form;

  useEffect (() => {
    (async () => {
       setLoadingDropdown(true);
      const resRole= await roleApi.getList();
      setRole(resRole?.data);
      setLoadingDropdown(false);
    })();
  }, []);

  useEffect (() => {
    setFieldsValue ({
      username: data?.username,
      roleId: data?.role?.id,
    });
  }, [data]);

  const onConfirm = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        const { username, roleId, password }= values;
        const objReq= {
          password,
          roleId,
          username,
          employeeId,
        };

        if(!data?.username) {
          accountApi
            .create(objReq)
            .then((res) => {
              setLoading(false);
              if(res.code !== 201) {
                message.error( t("CORE.task_failure"));
                return;
              }
              dispatch(update_identity_table_data_success(identity, res.data));
              message.success(t("CORE.ACCOUNT.CREATE.SUCCESS"));
              setLoading(false);
              action();
            })
            .catch(() => {
              message.error(t("CORE.error.system"));
              setLoading(false);
            });
        } else {
          accountApi.update(data.id, objReq)
            .then((res) => {
            setLoading(false);
            if (res.code !== 200) {
              message.error(t("CORE.task_failure"));
              return;
            }

            dispatch(update_identity_table_data_success(identity, res.data));
            message.success(t("CORE.ACCOUNT.UPDATE.SUCCESS"));
            action();
          });
        }
      }
    });
  };

  return(
    <Spin spinning ={loadingDropdown}>
      <Form onSubmit= {onConfirm}>
        <Row type ="flex" justify="center">
          <Col span ={12}>
            <Form.Item label ={t("CORE.EMPLOYEE.USERNAME")}>
              {getFieldDecorator("username",{
                rules:[
                  {
                    required:true,
                    message: (<>{t("CORE.ACCOUNT.ALERT.USERNAME")}</>),
                    whitespace:false,
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
            <Form.Item label={t("CORE.EMPLOYEE.ROLE")}>
              {getFieldDecorator("roleId", {
                rules: [
                  {
                    required: true,
                    message: (<>{t("CORE.ACCOUNT.ALERT.ROLE")}</>),
                  },
                ],
                initialValue: listRole?.[0]?.id,
              })(
                <Select>
                  {listRole.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              )}
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
    </Spin>
  );
};

export default Form.create({ name: "Account_Detail" })(AccountForm);
