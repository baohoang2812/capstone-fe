import "./index.less";

import React, { useState } from "react";
import { Form, Upload, Icon, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Configs */
import { currentEnv } from "~/Configs";

const { REST_FULL_STATIC_API_URL } = currentEnv;

const ImageUpload = ({
  label,
  help,
  image,
  onFileChange,
  onUploadImage,
  limit,
  required,
  allowDelete,
  disabled,
  colon,
}) => {
  const t = useTranslate();

  /* State */
  const [uploading, setUploading] = useState(false);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    let isAcceptSize = true;

    if (!isJpgOrPng) {
      message.error(t("CORE.image_support"));
    }

    if (limit) {
      if (file.size / 1024 / 1024 > limit) {
        isAcceptSize = false;
        message.error(t(`CORE.image_size`, undefined, { value: limit }));
      }
    } else {
      isAcceptSize = true;
    }

    if (isJpgOrPng && isAcceptSize) {
      return true;
    } else {
      return false;
    }
  };

  const customRequest = async (options) => {
    const { file } = options;
    const imageUpload = await onUploadImage(file);
    options.onSuccess(imageUpload, options.file);
  };

  const onChange = async (info) => {
    if (info.file.status === "uploading") {
      setUploading(true);
    }
    if (info.file.status === "done") {
      const { response } = info.file;
      setUploading(false);
      onFileChange(response);
    }
    if (info.file.status === "error") {
      message.error("Upload hình thất bại");
      setUploading(false);
    }
  };

  const onDeleteImage = (e) => {
    e.stopPropagation();
    onFileChange(null);
  };

  return (
    <Form.Item
      label={label || t("CORE.image")}
      help={help || t("CORE.image_support")}
      required={required}
      colon={colon}
    >
      <Upload
        disabled={disabled}
        className="file-image-upload"
        accept=".jpg, .jpeg, .png"
        showUploadList={false}
        customRequest={customRequest}
        onChange={onChange}
        beforeUpload={beforeUpload}
      >
        <div className="file-image-thumbnail">
          {image?.url ? (
            <>
              <img
                src={
                  /^(http|https):/.test(image.url)
                    ? image.url
                    : `${REST_FULL_STATIC_API_URL}${image.url}`
                }
                alt="template"
              />
              {uploading ? (
                <Icon className="icon-image-exists" type="loading" />
              ) : !allowDelete ? (
                <Icon className="icon-image-exists" type="upload" />
              ) : (
                <Icon
                  onClick={onDeleteImage}
                  className="icon-image-exists"
                  type="delete"
                />
              )}
            </>
          ) : (
            <Icon type={uploading ? "loading" : "upload"} />
          )}
        </div>
      </Upload>
    </Form.Item>
  );
};

ImageUpload.defaultProps = {
  limit: 2,
  required: false,
  allowDelete: true,
  disabled: false,
  colon: true,
};

export default React.memo(ImageUpload);
