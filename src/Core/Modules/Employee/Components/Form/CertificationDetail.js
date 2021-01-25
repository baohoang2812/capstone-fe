import "./style.less";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Select, Row, Col, Form, Input, Button, message } from "antd";

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

const CertificationDetail = ({ form, employeeId, action, data, is_create }) => {
  const [loadingDropdown, setLoadingDropdown] = useState(false);
  const [listRole, setRole] = useState([]);

  const t = useTranslate();
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  /* Redux */
  const dispatch = useDispatch();

  /* State */
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoadingDropdown(true);

      const resRole = await roleApi.getList();
      setRole(resRole?.data);

      setLoadingDropdown(false);
    })();
  }, []);

  useEffect(() => {
    setFieldsValue({
      username: data?.username,
      roleId: data?.roleId,
    });
  }, [data]);

  const onConfirm = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true);

        const { roleId, password } = values;

        const objReq = {
          employeeId,
          password,
          roleId,
        };

        if (!data?.username) {
          accountApi
            .create(objReq)
            .then((res) => {
              setLoading(false);

              if (res.status !== 200) {
                message.error(t("CORE.task_failure"));
                return;
              }

              dispatch(update_identity_table_data_success(identity, res.data));
              message.success(t("CORE.EMPLOYEE.CREATE.SUCCESS"));
              action();
            })
            .catch(() => {
              message.error(t("CORE.error.system"));
            });
        } else {
          accountApi.update(data.id, objReq).then((res) => {
            setLoading(false);

            if (res.status !== 200) {
              message.error(t("CORE.task_failure"));
              return;
            }

            dispatch(update_identity_table_data_success(identity, res.data));
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
          <Form.Item label={t("CORE.EMPLOYEE.ROLE")}>
            {getFieldDecorator("roleId", {
              rules: [
                {
                  required: true,
                  message: "Please select role!",
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
  );
};

export default Form.create({ name: "Certification_Detail" })(CertificationDetail);
