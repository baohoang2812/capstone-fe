/* eslint-disable use-isnan */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.less";
import { Row, Col, Form, Input, Button, message,Select } from "antd";
import axios from "axios";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { cameras as identity } from "~/Core/Modules/Cameras/Configs/constants";

/* Api */
import camerasApi from "~/Core/Modules/Cameras/Api/";
import workspaceApi from "~/Core/Modules/Cameras/Api/WorkspaceApi";
/* Components */
import Rector from "~/Core/Modules/Cameras/Components/Form/Rector";
const { Option } = Select;
const BranchDetailForm = ({ form, data, action, is_create }) => {
  const t = useTranslate();
  /* Redux */
  const dispatch = useDispatch();
  /* State */
  const [loading, setLoading] = useState(false);
  const [listWorkspace,setListWorkspace]= useState([]);
  const { getFieldDecorator, validateFields, setFieldsValue } = form;
  const [config, setConfig] = useState([
    {
      points: [],
      curMousePos: [0, 0],
      isMouseOverStartPoint: false,
      isFinished: false,
    },
  ]);

  const [imagePath, setImagePath] = useState([]);

  useEffect(() => {
    (async () => {
      const Workspace= await workspaceApi.getList();
      setListWorkspace(Workspace?.data?.result);
    })();
 
  }, []);
  useEffect(() => {
    setFieldsValue({
      name: data?.name,
      ip: data?.ip,
      customUrl: data?.customUrl,
      workspace: data?.workspace?.name,
      workspaceId: data?.workspace?.id,
      port: "string",
    });
    setImagePath(data.imagePath);
    if (data?.listBox?.length > 0) {
      setConfig([
        ...data.listBox,
        {
          points: [],
          curMousePos: [0, 0],
          isMouseOverStartPoint: false,
          isFinished: false,
        },
      ]);
    }
  }, [data]);

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
        console.log(config);

        

        if (is_create) {
          let listCamConfig = config.map((item) => {
            const pointX1 = Math.round(item?.points?.[0]?.[0]);
            const pointY1 = Math.round(item?.points?.[0]?.[1]);
            const pointX2 = Math.round(item?.points?.[1]?.[0]);
            const pointY2 = Math.round(item?.points?.[1]?.[1]);
            const pointX3 = Math.round(item?.points?.[2]?.[0]);
            const pointY3 = Math.round(item?.points?.[2]?.[1]);
            const pointX4 = Math.round(item?.points?.[3]?.[0]);
            const pointY4 = Math.round(item?.points?.[3]?.[1]);

            // const point1 = JSON.stringify(item?.points?.[0]);
            // const point2 = JSON.stringify(item?.points?.[1]);
            // const point3 = JSON.stringify(item?.points?.[2]);
            // const point4 = JSON.stringify(item?.points?.[3]);
            return {
              pointX1,
              pointY1,
              pointX2,
              pointY2,
              pointX3,
              pointY3,
              pointX4,
              pointY4,
              cameraId: 1
            };
          });
  
          listCamConfig.splice(-1,1);

          const newValue = {
            ...values,
            cameraConfig: listCamConfig
          }

          camerasApi
            .create(newValue)
            .then((res) => {
              setLoading(false);
              if (res.code !== 201) {
                message.error(t("CORE.task_failure"));
                return;
              }
             
              dispatch(update_identity_table_data_success(identity, res.data));
              message.success(t("CORE.CAMERA.CREATE.SUCCESS"));
              action();
            })
            .catch(() => {
              message.error(t("CORE.error.system"));
            });
        } else {
          console.log(values);
          let listCamConfig = config.map((item) => {
            const pointX1 = Math.round(item?.points?.[0]?.[0]);
            const pointY1 = Math.round(item?.points?.[0]?.[1]);
            const pointX2 = Math.round(item?.points?.[1]?.[0]);
            const pointY2 = Math.round(item?.points?.[1]?.[1]);
            const pointX3 = Math.round(item?.points?.[2]?.[0]);
            const pointY3 = Math.round(item?.points?.[2]?.[1]);
            const pointX4 = Math.round(item?.points?.[3]?.[0]);
            const pointY4 = Math.round(item?.points?.[3]?.[1]);

            // const point1 = JSON.stringify(item?.points?.[0]);
            // const point2 = JSON.stringify(item?.points?.[1]);
            // const point3 = JSON.stringify(item?.points?.[2]);
            // const point4 = JSON.stringify(item?.points?.[3]);
            return {
              id: 0,
              pointX1,
              pointY1,
              pointX2,
              pointY2,
              pointX3,
              pointY3,
              pointX4,
              pointY4,
              cameraId: 1
            };
          });
          // eslint-disable-next-line eqeqeq
          if(isNaN(listCamConfig?.[listCamConfig.length-1]?.pointX1)){
            listCamConfig.splice(-1,1);
          }

          camerasApi
            .update(data.id, {
              ...values,
              port: 0,
              imagePath,
              cameraConfig: listCamConfig
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
              message.success(t("CORE.CAMERA.UPDATE.SUCCESS"));
              action();
            });
        }
      }
    });
  };

  console.log(config);

  return (
    <Row type="flex" justify="center">
      <Col>
        <div className="div_custom">
          <Form onSubmit={onConfirm}>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.CAMERA.NAME")}>
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input camera name!",
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
                <Form.Item label={t("CORE.CAMERA.URL")}>
                  {getFieldDecorator("customUrl", {
                    rules: [
                      {
                        required: true,
                        message: "Please input camera url!",
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
                        message: "Please input camera IP!",
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
                <Form.Item label={t("CORE.CAMERA.WORKSPACE")}>
                  {getFieldDecorator("workspaceId", {
                    rules: [
                      {
                        required: true,
                        message: "Please select workspace!",
                      },
                     
                    ],
                  })(
                    <Select>
                  {listWorkspace.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
                )}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col>
                <Rector
                  image={imagePath}
                  setConfig={setConfig}
                  config={config}
                  getNewImage={handleGetNewImage}
                />
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
