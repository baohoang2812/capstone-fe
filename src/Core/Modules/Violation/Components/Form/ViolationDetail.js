import React, { useEffect, useState } from "react";
import "./style.less";
import { useDispatch } from "react-redux";
import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Spin,
    message
} from "antd";
import moment from "moment";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { violations as identity } from "~/Core/Modules/Violation/Configs/Constants";

/* Api */
import violationApi from "~/Core/Modules/Report/Api/Violation";
import employeeApi from "~/Core/Modules/Employee/Api";

const ViolationDetail = ({ form, is_create, action, data }) => {
    const t = useTranslate();
    const { TextArea } = Input;
    /* Redux */
    const dispatch = useDispatch();
    /* State */
    const [loading, setLoading] = useState(false);
    // const [loadingDropdown, setLoadingDropdown] = useState(false);
    const { getFieldDecorator, validateFields} = form;
    const [dataEmployee, setDataEmployee] = useState([]);
    useEffect(() => {
        if (data?.employeeIds?.length > 0) {
            employeeApi.getListFilter(data.employeeIds)
                .then(res => {
                    const result = res.data.result;
                    setDataEmployee(result);
                })
        } else {
            setDataEmployee([])
        }

    }, [data]);

    const onConfirm = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                console.log(values);
                setLoading(true);
                violationApi.update(
                    data.id,
                    {
                        excuse: values.excuse,
                        name: "string",
                        description: "string",
                        imagePath: "string",
                        reportId: 0,
                        regulationId: 0,
                        status: "Excused",
                        branchId: 0
                    }
                )
                    .then((res) => {
                        if (res.code !== 200) {
                            message.error(t("CORE.task_failure"));
                            return;
                        }
                        dispatch(update_identity_table_data_success(identity, { id: res.data.id, column: "status", data: res.data.status }));
                        dispatch(update_identity_table_data_success(identity, { id: res.data.id, column: "excuse", data: values.excuse }));
                        message.success(t("CORE.VIOLATION.CONFIRM.SUCCESS"));
                        setLoading(false);
                        action();
                    })
                    .catch(() => {
                        message.error(t("CORE.error.system"));
                        setLoading(false);
                    });

            }
        });
    };
    return (
        <Row type="flex" justify="center">
            <Col span={24}>
                <Spin>
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
                                <Form.Item label={t("CORE.VIOLATION.VIOLATOR")}>
                                    {getFieldDecorator('select-multiple', {

                                    })(
                                        <>
                                            {
                                                dataEmployee.map(item => {
                                                    return (
                                                        <div>
                                                            {`${item.lastName} ${item.firstName}`}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row type="flex" justify="center" align="bottom">
                            <Col span={20}>
                                <Form.Item label={t("CORE.VIOLATION.EXCUSE")}>
                                    {getFieldDecorator("excuse", {

                                    })(
                                            <TextArea rows={4} />
                                        )}
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
            </Col>
        </Row >
    );
};
export default Form.create({ name: "Violation_Detail" })(
    ViolationDetail
);