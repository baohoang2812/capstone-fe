import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.less";
import {
  Select,
  Row,
  Col,
  Form,
  Input,
  Button,
  Spin,
  message,
} from "antd";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { regulations as identity } from "~/Core/Modules/Regulation/Configs/constants";

/* Api */
import regulationApi from "~/Core/Modules/Regulation/Api/";
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const { Option } = Select;
const token = localStorage.getItem("token" || "");
const RegulationDetailForm = ({ form }) => {
  const t = useTranslate();
  /* Redux */
  const dispatch = useDispatch();
  /* State */
  const [loading, setLoading] = useState(false);
  const [loadingDropdown, setLoadingDropdown] = useState(false);
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  const onConfirm = (e) => {

  };
  return (
    <Row type="flex" justify="center">
      <Col span={12}>
        <div className="div_custom">
          <Spin spinning={loadingDropdown}>
            <Form onSubmit={onConfirm}>
              <Row type="flex" justify="center" align="bottom">
                <Col span={15}>
                  <Form.Item label={t("CORE.REGULATION.NAME")}>
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message: "Please input regulation name!"
                        },
                        {
                          max: 255,
                          message: "Max length is 255 character!"
                        }
                      ]

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
                          message: "Please input regulation type!"
                        },
                        {
                          max: 50,
                          message: "Max length is 50 characters!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="center" align="bottom">
                <Col span={15}>
                  <Form.Item label={t("CORE.REGULATION.DESCRIPTION")}>
                    {getFieldDecorator("description", {
                      rules: [
                        {
                          required: true,
                          message: "Please input description!"
                        },
                        {
                          max: 2000,
                          message: "Max length is 2000 characters!"
                        }
                      ]
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
                          message: "Please input level!",
                        },

                        {
                          max: 1,
                          message: "Max length is 1 characters!",
                        },
                      ],
                    })(<Input />)}
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
                          message: "Please input point!",
                        },

                        {
                          max: 1,
                          message: "Max length is 1 characters!",
                        },
                      ],
                    })(<Input />)}
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
                    onClick={onConfirm}>
                    {t("CORE.confirm")}
                  </Button>
                </div>
              </Row>
            </Form>
          </Spin>
        </div>
      </Col>
    </Row>
  );
};
export default Form.create({ name: "Form_Regulation_Detail" })(
  RegulationDetailForm
);