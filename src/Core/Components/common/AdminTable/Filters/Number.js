import React, { useState } from "react";
import { Select, Input } from "antd";

let timeoutId;
const { Option } = Select;
const actions = [
  {
    sign: "=",
    code: "eq",
    label: "Bằng"
  },
  {
    sign: "#",
    label: "Khác",
    code: "ne",
  },
  {
    sign: "<",
    code: "lt",
    label: "Nhỏ hơn"
  },
  {
    sign: "<=",
    code: "lte",
    label: "Nhỏ hơn hoặc bằng"
  },
  {
    sign: ">",
    code: "gt",
    label: "Lớn hơn"
  },
  {
    sign: ">=",
    code: "gte",
    label: "Lớn hơn hoặc bằng"
  }
];

const Number = ({
  fieldKey,
  handleFilterChange,
  defaultValue = { operator: "eq", value: null },
  format
}) => {

  /* State */
  const [operator, setOperator] = useState(defaultValue.operator);
  const [value, setValue] = useState(defaultValue.value);

  const onChangeOperator = (operator) => {
    if (value) {

      if (operator === "reset") {
        setValue(null);
        setOperator("eq");
  
        const filter = { [fieldKey]: { operator } };
        handleFilterChange(filter);
        return;
      }

      const filter = { [fieldKey]: { operator, value: format === "integer" ? +value : value } };
      handleFilterChange(filter);
    }

    setOperator(operator === "reset" ? "eq" : operator);
  }

  const onChangeValue = ({ target: { value } }) => {
    let filter;

    if (/^[0-9-]+$/.test(value)) {
      setValue(value);
      filter = { [fieldKey]: { operator, value: format === "integer" ? +value : value } };
    } else if (!value) {
      setValue(value);
      filter = { [fieldKey]: { operator: "reset" } };
    }

    if (filter && value !== "-") {
      if (timeoutId) { clearTimeout(timeoutId); }
    
      timeoutId = setTimeout(() => {
        handleFilterChange(filter);
      }, 500);
    }
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

export default Number;
