import React, { useState } from "react";
import { Select } from "antd";

let timeoutId;
const { Option } = Select;
const actions = [
  {
    sign: "*",
    code: "haveJsonb",
    label: "Chứa"
  },
  {
    sign: "!",
    code: "nHaveJsonb",
    label: "Không chứa",
  },
];

const JSONB = ({
  fieldKey,
  handleFilterChange,
  defaultValue = { operator: "haveJsonb", value: [] },
  params = []
}) => {

  /* State */
  const [operator, setOperator] = useState(defaultValue.operator);
  const [value, setValue] = useState(defaultValue.value);

  const onChangeOperator = (operator) => {
    if (value.length !== 0) {

      if (operator === "reset") {
        setValue([]);
        setOperator("haveJsonb");
  
        const filter = { [fieldKey]: { operator } };
        handleFilterChange(filter);
        return;
      }

      const filter = { [fieldKey]: { operator, value } };
      handleFilterChange(filter);
    }

    setOperator(operator === "reset" ? "haveJsonb" : operator);
  }

  const onChangeValue = (value) => {
    setValue(value);

    if (timeoutId) { clearTimeout(timeoutId); }

    timeoutId = setTimeout(() => {
      value = value.map((v) => Number.isNaN(+v) ? v : +v );
      let filter = { [fieldKey]: { operator, value } };

      if (value.length === 0) {
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
        <Select
          mode="multiple"
          showArrow={false}
          dropdownMatchSelectWidth={false}
          onChange={onChangeValue}
          value={value}
        >
          {
            params.map(param => (
              <Option key={param.value}>{param.title}</Option>
            ))
          }
        </Select>
      </div>
    </>
  )
}

export default JSONB;
