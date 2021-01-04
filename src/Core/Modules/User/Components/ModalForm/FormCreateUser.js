import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Form,
  Input,
  Button,
  Icon,
  message,
  Spin,
  Row,
  Col,
} from "antd";
import randomstring from "randomstring";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { add_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Contants */
import { users as identity } from "~/Core/Modules/User/Configs/constants";

/* Api */
import userApi from "~/Core/Modules/User/Api";

/* Heplers */
import { checkPassword } from "~/Core/utils/helper/validate";

let intervalId;

const FormCreateUser = ({ form, setVisibleModal, visibleModal }) => {
  const t = useTranslate();
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  /* Redux */
  const dispatch = useDispatch();

  /* State */
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!visibleModal) {
      setGenerating(false);
      if (intervalId) {
        clearInterval(intervalId);
      }

      setFieldsValue({
        first_name: null,
        last_name: null,
        username: null,
        password: null,
        type: null,
      });
    }
  }, [visibleModal]);

  const handleSubmit = (e) => {
    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        values.first_name = values.first_name.trim();
        values.last_name = values.last_name.trim();
        values.username = values.username.toLowerCase();
        userApi
          .createUser(values)
          .then((res) => {
            setLoading(false);
            if (res.status !== 200) {
              message.error(res.message);
              return;
            }
            dispatch(add_identity_table_data_success(identity, res.data));
            message.success(t("CORE.message.success.save"));
            handleCloseModal();
          })
          .catch(() => {
            setLoading(false);
            message.error(t("CORE.error.system"));
          });
      }
    });
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
  };

  const generatePassword = () => {
    setGenerating(true);

    let password = randomstring.generate({
      length: 8,
      charset: "alphanumeric",
    });

    if (!checkPassword(password)) {
      const input = document.getElementById("create_user_form_password");
      intervalId = setInterval(() => {
        password = randomstring.generate({
          length: 8,
          charset: "alphanumeric",
        });

        if (checkPassword(password)) {
          setGenerating(false);
          clearInterval(intervalId);
          setFieldsValue({ password });
        }

        input.value = password;
      }, 150)
      return;
    }

    setGenerating(false);
    setFieldsValue({ password });
  };

  return (
    <Spin spinning={loading} className="modal-create-user">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col span={12}>
            <Form.Item
              label={
                <span className="txt-service-name">
                  {t("CORE.USER.LAST.NAME").toUpperCase()}
                </span>
              }
              required={false}
              colon={false}
              autoComplete="old-last-name"
              name="old-l-name"
            >
              {getFieldDecorator("last_name", {
                rules: [
                  { transform: (value) => value?.trim() },
                  {
                    whitespace: true,
                    required: true,
                    message: t("CORE.please_input_value", undefined, {
                      value: t("CORE.USER.LAST.NAME"),
                    }),
                  },
                  {
                    max: 50,
                    message: t("CORE.character_max_len", undefined, {
                      value: t("CORE.USER.LAST.NAME"),
                      number: 50,
                    }),
                  },
                ],
              })(<Input allowClear />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={
                <span className="txt-service-name">
                  {t("CORE.USER.FIRST.NAME").toUpperCase()}
                </span>
              }
              required={false}
              colon={false}
              autoComplete="old-first-name"
              name="old-f-name"
              style={{ marginLeft: 10 }}
            >
              {getFieldDecorator("first_name", {
                rules: [
                  { transform: (value) => value?.trim() },
                  {
                    whitespace: true,
                    required: true,
                    message: t("CORE.please_input_value", undefined, {
                      value: t("CORE.USER.FIRST.NAME"),
                    }),
                  },
                  {
                    max: 50,
                    message: t("CORE.character_max_len", undefined, {
                      value: t("CORE.USER.FIRST.NAME"),
                      number: 50,
                    }),
                  },
                ],
              })(<Input allowClear />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label={
                <span className="txt-service-name">
                  {t("CORE.USER.USERNAME").toUpperCase()}
                </span>
              }
              required={false}
              colon={false}
            >
              {getFieldDecorator("username", {
                getValueFromEvent: (e) => e.target.value.trim(),
                rules: [
                  {
                    required: true,
                    message: t("CORE.please_input_value", undefined, {
                      value: t("CORE.USER.USERNAME"),
                    }),
                  },
                  {
                    pattern: /^[a-zA-Z0-9_]*$/,
                    message: t("CORE.USER.VALIDATE.USERNAME"),
                  },
                  {
                    min: 4,
                    message: t("CORE.character_min_len", undefined, {
                      value: t("CORE.USER.USERNAME"),
                      number: 4,
                    }),
                  },
                  {
                    max: 50,
                    message: t("CORE.character_max_len", undefined, {
                      value: t("CORE.USER.USERNAME"),
                      number: 50,
                    }),
                  },
                ],
              })(<Input allowClear={true} />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
                label={
                  <>
                    <span
                      className="txt-service-name"
                    >
                      {t("CORE.USER.PASSWORD").toUpperCase()}
                    </span>
                    <Button
                      onClick={generating ? null : generatePassword}
                      className="generate-password"
                      type="link"
                      style={{ height: 20 }}
                      icon={generating ? <Icon type="reload" spin /> : null}
                    >
                      {generating
                        ? "Generating..."
                        : t("CORE.USER.PASSWORD.GENERATE")}
                    </Button>
                  </>
                }
                required={false}
                colon={false}
                className="label-password"
                style={{ marginLeft: 10 }}
              >
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: t("CORE.please_input_value", undefined, {
                        value: t("CORE.USER.PASSWORD"),
                      }),
                    },
                    {
                      validator: async (_, input) => {
                        if (!checkPassword(input)) {
                          throw new Error(t("CORE.USER.VALIDATE.PASSWORD"));
                        }
                      },
                    },
                  ],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                    autoComplete="new-password"
                  />
                )}
              </Form.Item>
          </Col>
        </Row>

        

        <div className="btn-group">
          <Button
            type="primary"
            className="btn-yellow-outline"
            onClick={handleCloseModal}
          >
            {t("CORE.cancel")}
          </Button>
          <Button
            disabled={generating}
            type="primary"
            htmlType="submit"
            className="btn-yellow btn-right"
            onClick={handleSubmit}
          >
            {t("CORE.confirm")}
          </Button>
        </div>
      </Form>
    </Spin>
  );
};

export default Form.create({ name: "create_user_form" })(FormCreateUser);
