import "./style.less";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Select, Row, Col, Form, Card, Button, message, Spin } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { employees as identity } from "~/Core/Modules/Employee/Configs/constants";

/* Api */
import accountApi from "~/Core/Modules/Employee/Api/Account";
import certificationTypeApi from "~/Core/Modules/Employee/Api/CertificationType";

const { Option } = Select;
const { Meta } = Card;

const CertificationDetail = ({ form, employeeId, action, data, is_create }) => {
  const [loadingDropdown, setLoadingDropdown] = useState(false);
  const [listCertificationType, setCertificationType] = useState([]);
  const [itemSelect, setItemSelect] = useState({});

  const t = useTranslate();
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  /* Redux */
  const dispatch = useDispatch();

  /* State */
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoadingDropdown(true);

      const resRole = await certificationTypeApi.getList();
      setCertificationType(resRole?.data?.result || []);

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

  const handleSelectChange = (value) => {
    const item = listCertificationType.filter((item) => item.id === value);
    setItemSelect(item?.[0]);
  };
  return (
    <Spin spinning={loadingDropdown}>
      <Form onSubmit={onConfirm}>
        <Row type="flex" justify="center">
          <Col span={16}>
            <Form.Item label={t("CORE.EMPLOYEE.ROLE")}>
              {getFieldDecorator("certificateTypeId", {
                rules: [
                  {
                    required: true,
                    message: "Please select role!",
                  },
                ],
                initialValue: listCertificationType?.[0]?.id,
              })(
                <Select onChange={handleSelectChange}>
                  {listCertificationType.map((item) => (
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
          <Col span={12}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt={itemSelect.name} src={itemSelect.imagePath} />}
            >
              <Meta
                title={itemSelect.name}
                description={itemSelect.description}
              />
            </Card>
            ,
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

export default Form.create({ name: "Certification_Detail" })(
  CertificationDetail
);
