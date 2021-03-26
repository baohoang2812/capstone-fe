import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import "./style.less";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  message,
  Cascader,
  Select
} from "antd";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { workspaces as identity } from "~/Core/Modules/Workspace/Configs/Constants";

/* Api */
import workspaceApi from "~/Core/Modules/Workspace/Api/";
import certificationTypeApi from "~/Core/Modules/Workspace/Api/CertificationType";
const { Option } = Select;
const WorkspaceDetailForm = ({ form, is_create, action, data }) => {
  const t = useTranslate();
  /* Redux */
  const dispatch = useDispatch();
  const listWorkSpace = useSelector(state => state[identity].list);

  /* State */
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator, validateFields, setFieldsValue } = form;
  // const [hashOption, setHashOption] = useState({});
  const [options, setOptions] = useState([]);
  const [listCertificationType, setCertificationType] = useState([]);

  // useEffect(() => {
  //   setFieldsValue({
  //     name: data?.name,
  //     description: data?.description,
  //     parent: data?.parent?.name

  //   });
  // }, [data]);
  useEffect(() => {
    (async () => {
      const resRole = await certificationTypeApi.getList();
      setCertificationType(resRole?.data?.result || []);
    })();
  }, []);
  useEffect (() => {
    console.log(data?.certificateTypes?.map((item) => (item.id))
    ,"IDS");
    setFieldsValue ({
      certificateTypeIds: data?.certificateTypes?.map((item) => (item.id))
     
    });
  }, [data]);
  useEffect(() => {
    const {
      id,
      name,
      description,
      parent,
    } = data;
    console.log(listWorkSpace);
    const [options] = generateCascaderOptions(listWorkSpace, id);
    setOptions(options);
    // setHashOption(hashOption);
    console.log(parent);
    const parent_ids = getListParentIds(listWorkSpace, parent?.id);
    console.log(parent_ids);
    setFieldsValue({ name, description, parentId: parent_ids });

  }, [JSON.stringify(data), listWorkSpace])

  const generateCascaderOptions = (categories, current_id) => {
    let hash = {}, options = [];

    for (let i = 0; i < categories.length; i++) {
      const item = categories[i];
      hash[item.id] = { value: item.id, label: item.name, children: [] };
    }

    for (let i = 0; i < categories.length; i++) {
      const item = categories[i];
      if (item.id !== current_id) {
        if (item?.parent?.id && hash[item?.parent?.id]) {

          hash[item?.parent?.id].children.push(hash[item.id]);
          continue;
        }
        options.push(hash[item.id]);
      }
    }
    return [options, hash];
  }

  const getListParentIds = (options, parent_id, parent_ids = []) => {
    if (parent_id === null || parent_id === undefined) {
      return parent_ids.reverse();
    }

    parent_ids.push(parent_id);
    const parent = options.find(item => item.id === parent_id);

    if (parent && parent.parent_id !== null) {
      return getListParentIds(options, parent?.parent?.id, parent_ids);
    } else {
      return getListParentIds(options, null, parent_ids);
    }
  }

  const onConfirm = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        const { parentId } = values;
        let parent_id = null;
        if (parentId?.length) {
          parent_id = parentId[parentId.length - 1];
        }
        const newValue = {
          ...values,
          parentId: parent_id
        }
        if (is_create) {
          workspaceApi
            .create(newValue)
            .then((res) => {
              setLoading(false);

              if (res.code !== 201) {
                message.error(t("CORE.task_failure"));
                return;
              }
              setLoading(false);

              dispatch(update_identity_table_data_success(identity, res.data));
              message.success(t("CORE.WORKSPACE.CREATE.SUCCESS"));
              action();
            })
            .catch(() => {
              setLoading(false);
              message.error(t("CORE.error.system"));
            });
        } else {
          // objReq.employee.id = data.employee.id;
          workspaceApi.update(data.id, newValue).then((res) => {
            setLoading(false);

            if (res.code !== 200) {
              message.error(t("CORE.task_failure"));
              return;
            }
            setLoading(false);

            dispatch(update_identity_table_data_success(identity, res.data));
            message.success(t("CORE.WORKSPACE.UPDATE.SUCCESS"));
            action();
          }).catch(() => {
            setLoading(false);
            message.error(t("CORE.error.system"));
          });
        }
      }
    });
  };

  return (
    <Row type="flex" justify="center">
      <Col span={12}>
        <div className="div_custom">
          <Form onSubmit={onConfirm}>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.WORKSPACE.NAME")}>
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input workspace name!",
                      },
                      {
                        max: 255,
                        message: "Max length is 255 character!",
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>

            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.WORKSPACE.DESCRIPTION")}>
                  {getFieldDecorator("description", {
                    rules: [
                      {
                        required: true,
                        message: "Please input description!",
                      },
                      {
                        max: 2000,
                        message: "Max length is 2000 characters!",
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.WORKSPACE.PARENT")}>
                  {getFieldDecorator(
                    "parentId",
                    {}
                  )(
                    <Cascader placeholder={t("WORKSPACE.PARENT_CATE.PLACEHOLDER")} options={options} changeOnSelect={true} />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.WORKSPACE.CERTIFICATE")}>
                  {getFieldDecorator(
                    "certificateTypeIds",
                    {}
                  )(
                    <Select mode="multiple" placeholder={t("CORE.WORKSPACE.CERTIFICATE.ALERT")}>
                      {listCertificationType.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {`${item.name}`}
                        </Option>
                      ))}
                    </Select>,
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
export default Form.create({ name: "Form_Workspace_Detail" })(
  WorkspaceDetailForm
);
