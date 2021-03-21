import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.less";
import { Row, Col, Form, Input, Button, message } from "antd";
import axios from "axios";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { cameras as identity } from "~/Core/Modules/Cameras/Configs/constants";

/* Api */
import camerasApi from "~/Core/Modules/Cameras/Api/";

/* Components */
import Rector from "~/Core/Modules/Cameras/Components/Form/Rector";

const BranchDetailForm = ({ form, data, action, is_create }) => {
  const t = useTranslate();
  /* Redux */
  const dispatch = useDispatch();
  /* State */
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator, validateFields, setFieldsValue } = form;
  const [config, setConfig] = useState([]);
  const [imagePath, setImagePath] = useState([]);

  useEffect(() => {
    setFieldsValue({
      name: data?.name,
      ip: data?.ip,
      customUrl: data?.customUrl,
      workspace: data?.workspace?.name,
      workspaceId: 1,
      port: "string",
    });
    setImagePath(data.imagePath);
    if(data?.config?.length > 0) {
      setConfig(JSON.parse(data?.config))
    }
  }, [data]);

  const onSelected = (rect) => {
    const configTmp = [
      ...config,
      {
        selected: false,
        index: config.length,
        ...rect,
      },
    ];
    setConfig(configTmp);
  };

  const undo = () => {
    let configTmp =
      config.length >= 2
        ? config.filter((item) => item.index !== config.length - 1)
        : [];
    setConfig(configTmp);
  };

  const handleGetNewImage = async () => {
    const res = await axios.get(
      `${data?.customUrl}/images?cameraId=${data?.ip}`
    );
    setImagePath(res?.data?.imagePath);
  };

  const onConfirm = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        console.log(values);
        if (is_create) {
          camerasApi
            .create(values)
            .then((res) => {
              setLoading(false);
              if (res.code !== 201) {
                message.error(t("CORE.task_failure"));
                return;
              }
              dispatch(update_identity_table_data_success(identity, res.data));
              message.success(t("CORE.BRANCH.CREATE.SUCCESS"));
              action();
            })
            .catch(() => {
              message.error(t("CORE.error.system"));
            });
        } else {
          console.log(values);
          camerasApi
            .update(data.id, {
              ...values,
              port: "string",
              workspaceId: 1,
              imagePath,
              config: JSON.stringify(config),
            })
            .then((res) => {
              setLoading(false);

              if (res.code !== 200) {
                message.error(t("CORE.task_failure"));
                return;
              }
              dispatch(
                update_identity_table_data_success(identity, res.data.branch)
              );
              message.success(t("CORE.BRANCH.UPDATE.SUCCESS"));
              action();
            });
        }
      }
    });
  };
  return (
    <Row type="flex" justify="center">
      <Col>
        <div className="div_custom">
          <Form onSubmit={onConfirm}>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.BRANCH.NAME")}>
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input branch name!",
                      },
                      {
                        max: 255,
                        message: "Max length is 255 characters!",
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.CAMERA.BRANCH.URL")}>
                  {getFieldDecorator("customUrl", {
                    rules: [
                      {
                        required: true,
                        message: "Please input branch name!",
                      },
                      {
                        max: 255,
                        message: "Max length is 255 characters!",
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.CAMERA.IP")}>
                  {getFieldDecorator("ip", {
                    rules: [
                      {
                        required: true,
                        message: "Please input branch name!",
                      },
                      {
                        max: 255,
                        message: "Max length is 255 characters!",
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={23}>
                <Button
                  type="primary"
                  style={{ float: "left", margin: 20 }}
                  onClick={undo}
                >
                  Undo
                </Button>
                <Button
                  type="primary"
                  style={{ float: "left", margin: 20 }}
                  onClick={handleGetNewImage}
                >
                  Get new image
                </Button>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={23}>
                <div>
                  <Rector
                    width="640"
                    height="480"
                    onSelected={onSelected}
                    config={config}
                    image={imagePath}
                  />
                </div>
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
export default Form.create({ name: "Form_Branch_Detail" })(BranchDetailForm);
