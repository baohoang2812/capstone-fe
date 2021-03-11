import React, { useEffect, useState } from "react";
import "./style.less";
import { useDispatch } from "react-redux";
import {
    Row,
    Col,
    Form,
    Button,
    Divider,
    message,
    Select
} from "antd";
import moment from "moment";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { violations as identity } from "~/Core/Modules/Violation/Configs/Constants";

/* Api */
import ViolationEmployeeApi from "~/Core/Modules/Violation/Api/ViolationEmployee";
import employeeApi from "~/Core/Modules/Employee/Api";
import violationApi from "~/Core/Modules/Violation/Api/Violation";

const UpdateViolatorDetail = ({ form, isShow = true, action, data }) => {
    const t = useTranslate();
    /* Redux */
    const dispatch = useDispatch();
    /* State */
    const [loading, setLoading] = useState(false);
    // const [loadingDropdown, setLoadingDropdown] = useState(false);
    const { getFieldDecorator, validateFields} = form;
    const [dataEmployee, setDataEmployee] = useState([]);

    useEffect(() => {
        console.log(data);
        employeeApi.getList()
            .then(res => {
                const result = res.data.result;
                setDataEmployee(result);
            }
            )

    }, [data]);
    const { Option } = Select;
    const onConfirm = (e) => {
        e.preventDefault();
        validateFields((err, values) => {

            if (!err) {
                setLoading(true);
                ViolationEmployeeApi.create(
                    data.id,

                    {
                        "employeeIds": values.violator
                    }

                )
                    .then((res) => {
                        if (res.code !== 201) {
                            message.error(t("CORE.task_failure"));
                            return;
                        }
                        violationApi.update(
                            data.id,
                            {
                                excuse: "string",
                                name: "string",
                                description: "string",
                                imagePath: "string",
                                reportId: 0,
                                regulationId: 0,
                                status: "Confirmed",
                                branchId: 0
                            }
                        ).then((res) => {
                            if (res.code !== 200) {
                                message.error(t("CORE.task_failure"));
                                return;
                            }
                            dispatch(update_identity_table_data_success(identity, { id: res.data.id, column: "status", data: res.data.status }));
                            dispatch(update_identity_table_data_success(identity, { id: res.data.id, column: "employeeIds", data: values.violator }));
                            message.success(t("CORE.VIOLATION.CREATE.SUCCESS"));
                            setLoading(false);
                            action();
                        })
                            .catch(() => {
                                message.error(t("CORE.error.system"));
                                setLoading(false);
                            });

                    })
                    .catch(() => {
                        message.error(t("CORE.error.system"));
                        setLoading(false);
                    });

            }
        });
    };
    console.log(dataEmployee);
    return (
        <Row type="flex" justify="center">
            <Col span={24}>
                
                    <Form onSubmit={onConfirm}>
                        <Row type="flex" justify="center" align="bottom">
                            <Col span={20}>
                                <Form.Item label={t("CORE.VIOLATION.NAME")}>
                                    {getFieldDecorator("name", {

                                    })(<span>{data.name}</span>)}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row type="flex" justify="center" align="bottom">
                            <Col span={20}>
                                <Form.Item label={t("CORE.VIOLATION.DESCRIPTION")}>
                                    {getFieldDecorator("description", {

                                    })(<span>{data.description}</span>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" align="bottom">
                            <Col span={20}>
                                <Form.Item label={t("CORE.VIOLATION.IMAGE.PATH")}>
                                    {getFieldDecorator("imagePath", {

                                    })(<img alt="example" style={{ width: "100%" }} src={data.imagePath} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" align="bottom">
                            <Col span={20}>
                                <Form.Item label={t("CORE.VIOLATION.CHARGE.CREATE")}>
                                    {getFieldDecorator("createdAt", {

                                    })(<span>{moment(data.createdAt).format("DD-MM-YYYY")}</span>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" align="bottom">
                            <Col span={20}>
                                <Form.Item label={t("CORE.VIOLATION.SELECT.VIOLATOR")}>
                                    {getFieldDecorator("violator", {
                                        rules: [
                                            { required: true, message: 'Please select violator!', type: 'array' },
                                        ],
                                        initialValue: dataEmployee?.[0]?.id,
                                    })(
                                        <Select mode="multiple" placeholder="Please select violator">
                                            {dataEmployee.map((item) => (
                                                <Option key={item.id} value={item.id}>
                                                    {`${item.lastName} ${item.firstName}`}
                                                </Option>
                                            ))}
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center">
                            {isShow ? (<div className="btn-group">

                                <Button
                                    loading={loading}
                                    type="danger"
                                    className="btn-yellow btn-left"
                                    style={{ float: "right" }}
                                    onClick={action}>
                                    {t("CORE.cancel")}
                                </Button>
                                <Divider type="vertical" />

                                <Button
                                    loading={loading}
                                    type="primary"
                                    htmlType="submit"
                                    className="btn-yellow btn-right"
                                    style={{ float: "right" }}
                                    onClick={onConfirm}>
                                    {t("CORE.VIOLATION.CONFIRM.ACCEPT")}
                                </Button>
                            </div>) : null}
                        </Row>
                    </Form>
                
            </Col>
        </Row>
    );
};
export default Form.create({ name: "UpdatePerson_Detail" })(
    UpdateViolatorDetail
);