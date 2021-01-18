import "~/Core/Modules/Employee/bootstrap.less";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Select, DatePicker, Upload, Icon, Row, Col, Form, Input, Button, Modal, Spin, message, Alert } from "antd";
import randomstring from "randomstring";
import moment from "moment";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { employees as identity } from "~/Core/Modules/Employee/Configs/constants";

/* Api */
import employeeApi from "~/Core/Modules/Employee/Api";
import branchApi from "~/Core/Modules/Employee/Api/Branch";
import roleApi from "~/Core/Modules/Employee/Api/Role";
import positionApi from "~/Core/Modules/Employee/Api/Position";


const { Option } = Select;

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const EmployeeDetailForm = ({
    form,
    action,
    data,
    is_create
}) => {
    const t = useTranslate();
    const { getFieldDecorator, validateFields, setFieldsValue } = form;

    /* Redux */
    const dispatch = useDispatch();

    /* State */
    const [listBranch, setListBranch] = useState([]);
    const [listRole, setRole] = useState([]);
    const [listPosition, setPosition] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingDropdown, setLoadingDropdown] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');


    useEffect(() => {
        (async () => {
            setLoadingDropdown(true);

            const resBranch = await branchApi.getList();
            const resRole = await roleApi.getList();
            const resPosition = await positionApi.getList();

            setListBranch(resBranch?.data?.list);
            setRole(resRole?.data?.list);
            setPosition(resPosition?.data?.list);

            setLoadingDropdown(false);
        })()
    }, [])

    useEffect(() => {
        console.log(data);
        setFieldsValue({
            code: data?.employee?.code,
            first_name: data?.employee?.first_name,
            last_name: data?.employee?.last_name,
            email: data?.employee?.email,
            phone_number: data?.employee?.phone_number,
            address: data?.employee?.address,
            username: data?.employee?.username,

            role_id: data?.employee?.role_id,
            gender: data?.employee?.gender,
            birth_date: new moment(data?.employee?.birth_date),
            is_part_time: data?.employee?.is_part_time,
            branch_id: data?.employee?.branch_id,
            position_id: data?.employee?.position_id,
        });

        setFileList([{
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: data?.employee?.image_path,
        }])
    }, [data])

    const onConfirm = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                setLoading(true);
                const newValues = {
                    ...values,
                    birth_date: values['birth_date'].format('YYYY-MM-DD'),
                    image_path: values?.['image_path']?.file?.response?.url
                };
                console.log(newValues);
                newValues.branch_manager_id = 1;
                newValues.status = "test"
                const { username, hash_password, ...employee } = newValues;
                setLoading(false);
                const objReq = {
                    employee,
                    account: {
                        username, hash_password
                    }
                }
                console.log(objReq);
                if (is_create) {
                    employeeApi.create(objReq).then((res) => {
                        setLoading(false);

                        if (res.status !== 200) {
                            message.error(t("CORE.task_failure"));
                            return;
                        }

                        dispatch(update_identity_table_data_success(identity, res.data.employee));
                        message.success(t("CORE.EMPLOYEE.CREATE.SUCCESS"));
                        action();
                    })
                        .catch(() => {
                            message.error(t("CORE.error.system"));
                        });
                }
                else{
                    objReq.employee.id = data.employee
                    employeeApi.update(objReq).then((res) => {
                        setLoading(false);

                        if (res.status !== 200) {
                            message.error(t("CORE.task_failure"));
                            return;
                        }

                        dispatch(update_identity_table_data_success(identity, res.data.employee));
                        message.success(t("CORE.EMPLOYEE.UPDATE.SUCCESS"));
                        action();
                    })
                }


            }
        });
    };

    const randomCode = () => {
        const code = randomstring.generate({
            length: 8,
            charset: "alphanumeric",
        });
        console.log(code);
        setFieldsValue({
            code: code,
        });
    };


    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    const handleChange = ({ fileList }) => setFileList(fileList);

    return (
        <Row>
            <Spin spinning={loadingDropdown}>
                <Col span={12} offset={6}>
                    <div>
                        <div class="div_custom">

                        
                        <Form onSubmit={onConfirm}>
                            <Form.Item
                                label={t("CORE.EMPLOYEE.CODE")}
                            >
                                {getFieldDecorator('code', {
                                    rules: [{ required: true, message: 'Please input code!' }],
                                })(<Input />)}
                                <Button onClick={randomCode}>
                                    Generate Code
                                </Button>
                            </Form.Item>
                            <Form.Item
                                label={t("CORE.EMPLOYEE.SETTING.FIRST.NAME")}
                            >
                                {getFieldDecorator('first_name', {
                                    rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item
                                label={t("CORE.EMPLOYEE.SETTING.LAST.NAME")}
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
                            <Form.Item label={t("CORE.EMPLOYEE.PHONE.NUMBER")}>
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
                                label={t("CORE.EMPLOYEE.ADDRESS")}
                            >
                                {getFieldDecorator('address', {
                                    rules: [{ required: true, message: 'Please input address!', whitespace: true }],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item
                                label={t("CORE.EMPLOYEE.USERNAME")}
                            >
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input username!', whitespace: false }],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label={t("CORE.EMPLOYEE.PASSWORD")} hasFeedback>
                                {getFieldDecorator('hash_password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ],
                                })(<Input.Password />)}
                            </Form.Item>
                            <Form.Item label={t("CORE.EMPLOYEE.ROLE")}>
                                {getFieldDecorator('role_id', {
                                    rules: [
                                        {
                                            required: true, message: 'Please select role!'
                                        }],
                                    initialValue: listRole?.[0]?.id
                                })(
                                    <Select>
                                        {
                                            listRole.map(item => (
                                                <Option key={item.id} value={item.id} >{item.role}</Option>
                                            ))
                                        }
                                    </Select>,
                                )}
                            </Form.Item>
                            <Form.Item label={t("CORE.EMPLOYEE.GENDER")}>
                                {getFieldDecorator('gender', {
                                    rules: [
                                        {
                                            required: true, message: 'Please select your gender!'
                                        }],
                                    initialValue: "male"
                                })(
                                    <Select>
                                        <Option value="male">{t("CORE.EMPLOYEE.GENDER.MALE")}</Option>
                                        <Option value="female">{t("CORE.EMPLOYEE.GENDER.FEMALE")}</Option>
                                        <Option value="other">{t("CORE.EMPLOYEE.GENDER.OTHER")}</Option>
                                    </Select>,
                                )}
                            </Form.Item>
                            <Form.Item label={t("CORE.EMPLOYEE.DATE.OF.BIRTH")}>
                                {getFieldDecorator('birth_date', {
                                    rules: [{ type: 'object', required: true, message: 'Please select time!' }]
                                })(<DatePicker />)}
                            </Form.Item>
                            <Form.Item label={t("CORE.EMPLOYEE.JOB.TYPE")}>
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
                            <Form.Item label={t("CORE.EMPLOYEE.BRANCH.NAME")}>
                                {getFieldDecorator('branch_id', {
                                    rules: [
                                        {
                                            required: true, message: 'Please select branch name!'
                                        }],
                                    initialValue: listBranch?.[0]?.id
                                })(
                                    <Select>
                                        {
                                            listBranch.map(item => (
                                                <Option key={item.id} value={item.id} >{item.name}</Option>
                                            ))
                                        }
                                    </Select>,
                                )}
                            </Form.Item>
                            <Form.Item label={t("CORE.EMPLOYEE.POSITION")}>
                                {getFieldDecorator('position_id', {
                                    rules: [
                                        {
                                            required: true, message: 'Please select position!'
                                        }],
                                    initialValue: listPosition?.[0]?.id
                                })(
                                    <Select>
                                        {
                                            listPosition.map(item => (
                                                <Option key={item.id} value={item.id} >{item.name}</Option>
                                            ))
                                        }
                                    </Select>,
                                )}
                            </Form.Item>
                            <Form.Item label={t("CORE.EMPLOYEE.IMAGE.PATH")}>
                                {getFieldDecorator('image_path', {
                                    rules: [
                                        { required: true, message: 'Please select image!' }
                                    ]
                                })
                                    (
                                        <Upload
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={handlePreview}
                                            onChange={handleChange}
                                        >
                                            {fileList.length >= 1 ? null : (
                                                (
                                                    <div>
                                                        <Icon type="plus" />
                                                        <div className="ant-upload-text">Upload</div>
                                                    </div>
                                                )
                                            )}
                                        </Upload>

                                    )
                                }

                            </Form.Item>
                            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>

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
                    </div>
                </Col>
            </Spin>
        </Row>

    );

};

export default Form.create({ name: "Form_Employee_Detail" })(EmployeeDetailForm);