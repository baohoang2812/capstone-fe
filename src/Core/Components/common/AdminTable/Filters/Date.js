import React, { useState } from "react";
import { Select, DatePicker } from "antd";
import moment from "moment";

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
    code: "ne",
    label: "Khác"
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

const Date = ({
  fieldKey,
  handleFilterChange,
  defaultValue = { operator: "eq", value: null },
}) => {

  /* State */
  const [operator, setOperator] = useState(defaultValue.operator);
  const [value, setValue] = useState(
    defaultValue.value ?
      (defaultValue.operator === "eq" || defaultValue.operator === "ne" ? moment(defaultValue.value[0]) : moment(defaultValue.value))
    : null
  );

  const onChangeOperator = (operator) => {
    if (value) {

      if (operator === "reset") {
        setValue(null);
        setOperator("eq");
  
        const filter = { [fieldKey]: { operator } };
        handleFilterChange(filter);
        return;
      }

      const filter = extractFilter(operator, value);
      handleFilterChange(filter);
    }

    setOperator(operator === "reset" ? "eq" : operator);
  }

  const onChangeValue = (value) => {
    setValue(value);

    if (timeoutId) { clearTimeout(timeoutId); }

    timeoutId = setTimeout(() => {
      let filter;

      if (!value) {
        filter = { [fieldKey]: "reset" };
      } else {
        filter = extractFilter(operator, value);
      }

      handleFilterChange(filter);
    }, 500);
  }

  const extractFilter = (operator, date) => {
    let filter;

    if (operator === "eq" || operator === "ne") {
      const from = date.startOf("date").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      const to = date.endOf("date").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      filter = { [fieldKey]: { operator, value: [from, to], type: "date" } };
    } else if (operator === "lt" || operator === "gte") {
      const time = date.startOf("date").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      filter = { [fieldKey]: { operator, value: time, type: "date" } };
    } else {
      const time = date.endOf("date").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      filter = { [fieldKey]: { operator, value: time, type: "date" } };
    }

    return filter;
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
        <DatePicker
          onChange={onChangeValue}
          value={value}
          format={["DD/MM/YYYY"]}
          placeholder=""
          showToday={false}
          allowClear={false}
        />
      </div>
    </>
  )
}

export default Date;
