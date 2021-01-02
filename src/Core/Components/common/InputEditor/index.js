import "react-quill/dist/quill.snow.css";
import React from "react";
import { Form } from "antd";

/* Components*/
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";

/*Config*/
import { currentEnv } from "~/Configs";

/*Hook*/
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/*Api*/
import BaseApi from "~/Core/Api/BaseAPI";

const { REST_FULL_STATIC_API_URL } = currentEnv;

const baseApi = new BaseApi();

let setLoadingGlobal = false;

Quill.register("modules/ImageResize", ImageResize);

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code"],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ font: [] }],
      [{ align: [] }],
      ["image"],
      ["clean"],
    ],
    handlers: {
      image: imageHandler,
    },
  },
  ImageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize", "Toolbar"],
    handleStyles: {
      backgroundColor: "black",
      border: "none",
      color: "white",
    },
    displayStyles: {
      backgroundColor: "black",
      border: "none",
      color: "white",
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "color",
  "background",
  "list",
  "indent",
  "align",
  "link",
  "image",
  "clean",
  "code",
  "script",
  "size",
  "width",
];

function imageHandler() {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.onchange = async function () {
    setLoadingGlobal(true);
    const file = input.files[0];
    const image = await baseApi.uploadImage(file);
    const range = this.quill.getSelection();
    const link = `${REST_FULL_STATIC_API_URL}${image.url}`;
    this.quill.insertEmbed(range.index, "image", link);
    setLoadingGlobal(false);
  }.bind(this);
}

const InputEditor = ({
  setUpLoading,
  form,
  initialValue,
  label,
  fieldName,
  required,
}) => {
  const { getFieldDecorator } = form;
  const t = useTranslate();
  setLoadingGlobal = setUpLoading;

  return (
    <Form.Item label={label || t("CORE.description")}>
      {getFieldDecorator(fieldName || "quill", {
        initialValue: initialValue ? initialValue : null,
        rules: [
          { transform: (value) => value?.trim() },
          {
            required: required,
            message: required
              ? t("CORE.please_input_value", undefined, {
                  value: t(label || "CORE.description").toLowerCase(),
                })
              : null,
          },
          {
            validator: async (rule, input) => {
              if (required) {
                const span = document.createElement("span");
                span.innerHTML = input;
                if (
                  span.textContent.trim() === "" ||
                  span.innerText.trim() === ""
                ) {
                  throw new Error(
                    t("CORE.please_input_value", undefined, {
                      value: t(label || "CORE.description").toLowerCase(),
                    })
                  );
                }
              }
            },
          },
        ],
      })(
        <ReactQuill
          style={{ lineHeight: "initial" }}
          modules={modules}
          formats={formats}
        />
      )}
    </Form.Item>
  );
};

InputEditor.defaultProps = {
  required: true,
};

export default InputEditor;
