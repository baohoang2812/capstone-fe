import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.less";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  message,
  InputNumber,
  Select
} from "antd";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { regulations as identity } from "~/Core/Modules/Regulation/Configs/constants";

/* Api */
import regulationApi from "~/Core/Modules/Regulation/Api/";

const RegulationDetailForm = ({ form, is_create, action, data }) => {
  const t = useTranslate();
  const { Option } = Select;
  /* Redux */
  const dispatch = useDispatch();
  /* State */
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  useEffect(() => {
    setFieldsValue({
      name: data?.name,
      type: data?.type,
      description: data?.description,
      level: data?.level,
      minusPoint: data?.minusPoint,
    });
  }, [data]);

  const onConfirm = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        if (is_create) {
          regulationApi
            .create(values)
            .then((res) => {
              setLoading(false);

              if (res.code !== 201) {
                message.error(t("CORE.task_failure"));
                return;
              }
              setLoading(false);

              dispatch(update_identity_table_data_success(identity, res.data));
              message.success(t("CORE.REGULATION.CREATE.SUCCESS"));
              action();
            })
            .catch(() => {
              message.error(t("CORE.error.system"));
            });
        } else {
          // objReq.employee.id = data.employee.id;
          regulationApi.update(data.id, values).then((res) => {
            setLoading(false);

            if (res.code !== 200) {
              message.error(t("CORE.task_failure"));
              return;
            }
            setLoading(false);

            dispatch(update_identity_table_data_success(identity, res.data));
            message.success(t("CORE.REGULATION.UPDATE.SUCCESS"));
            action();
          });
        }
      }
    });
  };

  return (
    <Row type="flex" justify="center">
      <Col span={12}>
        <div className="div_custom">
          <Form onSubmit={onConfirm}>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.REGULATION.NAME")}>
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        whitespace: true,
                        required: true,
                        message: (<>{t("CORE.REGULATION.ALERT.NAME")}</>)
                      },
                      {
                        max: 255,
                        message: "Max length is 255 character!",
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.REGULATION.TYPE")}>
                  {getFieldDecorator("type", {
                    rules: [
                      {
                        required: true,
                        message: (<>{t("CORE.REGULATION.ALERT.TYPE")}</>)
                      },

                    ],
                  })(
                    <Select>
                      <Option value="IC">
                        IC
                  </Option>
                      <Option value="QC">
                        QC
                  </Option>
                      <Option value="CC">
                        CC
                  </Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.REGULATION.DESCRIPTION")}>
                  {getFieldDecorator("description", {
                    rules: [
                      {
                        whitespace: true,
                        required: true,
                        message: (<>{t("CORE.REGULATION.ALERT.DESCRIPTION")}</>)
                      },
                      {
                        max: 2000,
                        message: "Max length is 2000 characters!",
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.REGULATION.LEVEL")}>
                  {getFieldDecorator("level", {
                    rules: [
                      {
                        required: true,
                        message: (<>{t("CORE.REGULATION.ALERT.LEVEL")}</>)
                      },
                    ],
                  })(<Select>
                    <Option value={1}>
                      1
                  </Option>
                    <Option value={2}>
                      2
                  </Option>
                    <Option value={3}>
                      3
                  </Option>
                  </Select>)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.REGULATION.POINT")}>
                  {getFieldDecorator("minusPoint", {
                    rules: [
                      {

                        required: true,
                        message: (<>{t("CORE.REGULATION.ALERT.POINT")}</>)
                      },
                    ],
                  })(<InputNumber min={1} max={9} />)}
                </Form.Item>
              </Col>
            </Row>

            <Row type="flex" justify="center">
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
            </Row>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
export default Form.create({ name: "Form_Regulation_Detail" })(
  RegulationDetailForm
);
