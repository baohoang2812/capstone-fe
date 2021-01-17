import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Select, DatePicker, TimePicker, Row, Col, Form, Input, Button, message, Spin, Tooltip, Alert } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { employees as identity } from "~/Core/Modules/Employee/Configs/constants";

/* Api */
import employeeApi from "~/Core/Modules/Employee/Api";

const { Option } = Select;

const EmployeeDetailForm = ({
    form
}) => {
    const t = useTranslate();
    const { getFieldDecorator, validateFields, setFieldsValue } = form;

    /* Redux */
    const dispatch = useDispatch();

    /* State */
    const [loading, setLoading] = useState(false);
    const [loadingTransactionId, setLoadingTransactionId] = useState(false);
    const [transactionId, setTransactionId] = useState();





    const onConfirm = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                setLoading(true);
                const newValues = {
                    ...values,
                    'birth_date': values['birth_date'].format('YYYY-MM-DD'),
                }
                console.log(values);
                console.log(newValues);
                setLoading(false);
               

                // const dt = {
                //   contact_id: user.id,
                //   charge_value: +values.money,
                // };

                // employeeApi.chargeCreditByContact(dt).then((res) => {
                //   setLoading(false);

                //   if (res.status !== 200) {
                //     message.error(t("CORE.task_failure"));
                //     return;
                //   }

                //   const data = {
                //     ...user,
                //     credit_value: (res.data.charge_value || 0) + user.credit_value
                //   };

                //   const recordUpdate = {
                //     id: user.id,
                //     rowMode: true,
                //     data
                //   };

                //   setTransactionId(res.data.transaction_id);
                //   dispatch(update_identity_table_data_success(identity, recordUpdate));
                //   message.success(t("CORE.USER.CHARGE.CREDIT.SUCCESS"));
                // })
                // .catch(() => {
                //   message.error(t("CORE.error.system"));
                // });
            }
        });
    };


    return (
        <Row>
            <Col span={12} offset={6}>
                <div>

                    <Form onSubmit={onConfirm}>
                        
                        <Form.Item
                            label="First name"
                        >
                            {getFieldDecorator('first_name', {
                                rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item
                            label="Last name"
                        >
                            {getFieldDecorator('last_name', {
                                rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="E-mail">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Phone Number">
                            {getFieldDecorator('phone_number', {
                                rules: [
                                    {
                                        required: true, message: 'Please input phone number!'
                                    },
                                    {
                                        pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
                                        message: 'The input is not valid phone number!'

                                    },
                                    {
                                        max: 11,
                                        message: 'Max length is 11 characters!'
                                    },
                                    {
                                        min: 10,
                                        message: 'Min length is 10 characters!'
                                    }
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item
                            label="Username"
                        >
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input username!', whitespace: false }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Password" hasFeedback>
                            {getFieldDecorator('hash_password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ],
                            })(<Input.Password />)}
                        </Form.Item>
                        <Form.Item label="Gender">
                            {getFieldDecorator('gender', {
                                rules: [
                                    {
                                        required: true, message: 'Please select your gender!'
                                    }],
                                initialValue: "male"
                            })(
                                <Select>
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="Birth date">
                            {getFieldDecorator('birth_date', {
                                rules: [{ type: 'object', required: true, message: 'Please select time!' }]
                            })(<DatePicker />)}
                        </Form.Item>
                        <Form.Item label="Job type">
                            {getFieldDecorator('is_part_time', {
                                rules: [
                                    {
                                        required: true, message: 'Please select job type!'
                                    }],
                                initialValue: true
                            })(
                                <Select>
                                    <Option value={true} >Part time</Option>
                                    <Option value={false} >Full time</Option>
                                </Select>,
                            )}
                        </Form.Item>
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
                    </Form>
                </div>
            </Col>
        </Row>

    );
};

export default Form.create({ name: "Form_Employee_Detail" })(EmployeeDetailForm);