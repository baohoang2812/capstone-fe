import React, { useState } from "react";
import { Select, Input } from "antd";

let timeoutId;
const { Option } = Select;
const actions = [
  {
    sign: "*",
    code: "ilike",
    label: "Chứa"
  },
  {
    sign: "!",
    code: "nilike",
    label: "Không chứa"
  },
  {
    sign: "=",
    code: "eq",
    label: "Bằng"
  },
  {
    sign: "#",
    label: "Khác",
    code: "ne",
  }
];

const Text = ({
  fieldKey,
  handleFilterChange,
  defaultValue = { operator: "ilike", value: null }
}) => {

  /* State */
  const [operator, setOperator] = useState(defaultValue.operator);
  const [value, setValue] = useState(defaultValue.value);

  const onChangeOperator = (operator) => {
    if (value) {

      if (operator === "reset") {
        setValue(null);
        setOperator("ilike");
  
        const filter = { [fieldKey]: { operator } };
        handleFilterChange(filter);
        return;
      }

      const filter = { [fieldKey]: { operator, value } };
      handleFilterChange(filter);
    }

    setOperator(operator === "reset" ? "ilike" : operator);
  }

  const onChangeValue = ({ target: { value } }) => {
    setValue(value);

    if (timeoutId) { clearTimeout(timeoutId); }

    timeoutId = setTimeout(() => {
      let filter = { [fieldKey]: { operator, value } };

      if (!value) {
        filter = { [fieldKey]: { operator: "reset" } };
      }

      handleFilterChange(filter);
    }, 500);
  }

  return (
    <>
      <div className="filter-condition">
        <Select
          dropdownClassName="filter-condition-select"
          showArrow={false}
          dropdownMatchSelectWidth={false}
          onChange={onChangeOperator}
          value={operator}
        >
          <Option key="reset">
            <span className="option-value">&nbsp;</span>
            <span className="option-label">Xóa điều kiện lọc</span>
          </Option>
          {
            actions.map(action => (
              <Option key={action.code}>
                <span className="option-value">{action.sign}</span>
                <span className="option-label">{action.label}</span>
              </Option>
            ))
          }
        </Select>
      </div>
      <div className="filter-input">
        <Input onChange={onChangeValue} value={value} />
      </div>
    </>
  )
}

export default Text;
