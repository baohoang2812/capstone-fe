import "~/styles/pages/login.less";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Icon, Input, Alert, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import Footer from "~/Core/Modules/Authenticate/Components/Footer";

/* Api */
import { login } from "~/Core/Modules/Authenticate/Api";

/* Helpers */
import { setToken, setAccountInfo } from "~/Core/Modules/Authenticate/helpers";

const SignIn = ({ form }) => {
  const t = useTranslate();
  const { getFieldDecorator } = form;

  /* State */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const progressLoadingHeader = document.querySelector("canvas[height='15']");

    if (progressLoadingHeader) {
      progressLoadingHeader.style.setProperty("top", "0px", "important");
    }
  }, []);

  const onHandleLogin = (e) => {
    e.preventDefault();
    form.validateFields((err, { username, password }) => {
      if (!err) {
        setLoading(true);

        const user = {
          username,
          password,
        };

        login(user)
          .then(({ data }) => {
            setLoading(false);
            if (data.status !== 200) {
              setError(true);
              return;
            }

            const { token, full_name, image_path } = data;
            setToken(token);
            setAccountInfo({ full_name, image_path });

            window.location.replace("/");
          })
          .catch(() => {
            setLoading(false);
            message.error("Có lỗi xảy ra, không thể đăng nhập");
          });
      }
    });
  };

  const onChange = () => {
    if (error) setError(false);
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-form">
          <div className="logo">
            <Link to="/">
              <h1 className="text-logo">{t("AUTH.TITLE")}</h1>
            </Link>
            {error && (
              <Alert
                message={t("AUTHENTICATE.LOGIN.FORM_EMAILORPASSINVALID")}
                type="error"
                showIcon={true}
              />
            )}
          </div>
          <div className="form-content">
            <div className="body">
              <Form onSubmit={onHandleLogin}>
                <div className="form-basic">
                  <div className="form-group">
                    <Form.Item
                      label={t("AUTHENTICATE.LOGIN.FORM_PLACEHOLDER_EMAIL")}
                      required={false}
                      colon={false}
                    >
                      {getFieldDecorator("username", {
                        getValueFromEvent: (e) => e.target.value.trim(),
                        rules: [
                          {
                            required: true,
                            message: t("CORE.emailRequired"),
                          }
                        ],
                      })(
                        <Input
                          tabIndex="1"
                          prefix={
                            <Icon
                              type="mail"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="Email"
                          onChange={onChange}
                        />
                      )}
                    </Form.Item>
                    <Form.Item
                      label={t("AUTHENTICATE.LOGIN.FORM_PLACEHOLDER_PASS")}
                      colon={false}
                      required={false}
                    >
                      {getFieldDecorator("password", {
                        rules: [
                          {
                            required: true,
                            message: t("CORE.passwordRequired"),
                          },
                          {
                            min: 6,
                            message: t("CORE.passIsLessThan6Char"),
                          },
                        ],
                      })(
                        <Input.Password
                          tabIndex="2"
                          prefix={
                            <Icon
                              type="lock"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          type="password"
                          placeholder="Password"
                          onChange={onChange}
                        />
                      )}
                    </Form.Item>
                  </div>
                  <div className="form-group">
                    <Form.Item>
                      <Button
                        type="primary"
                        size="large"
                        block={true}
                        className="btn-login"
                        loading={loading}
                        tabIndex="3"
                        htmlType="submit"
                      >
                        {t("AUTHENTICATE.LOGIN.FORM_LOGINBTN")}
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Form.create({ name: "sign_in_form" })(SignIn);
