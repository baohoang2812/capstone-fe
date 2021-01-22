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
import { positions as identity } from "~/Core/Modules/Position/Configs/constants";

/* Api */
import positionApi from "~/Core/Modules/Position/Api/";
import { max } from "moment";
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
const PositionDetailForm = ({ form }) => {
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
                                    <Form.Item label={t("CORE.POSITION.NAME")}>
                                        {getFieldDecorator("name", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "Please input position name!"
                                                },
                                                {
                                                    max: 50,
                                                    message: "Max length 50 characters!"
                                                },
                                            ]
                                        })(<Input />)}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row type="flex" justify="center" align="bottom">
                                <Col span={15}>
                                    <Form.Item label={t("CORE.POSITION.DESCRIPTION")}>
                                        {getFieldDecorator("description", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "Please input description!"
                                                },
                                                {
                                                    max: 500,
                                                    message: "Max length 500 characters!"
                                                },

                                            ]
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
export default Form.create({ name: "Form_Position_Detail" })(
    PositionDetailForm
);