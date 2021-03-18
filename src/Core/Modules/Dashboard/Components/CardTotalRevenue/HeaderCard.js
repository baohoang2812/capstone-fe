import React, { useState, useEffect } from "react";

import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const HeaderCard = ({
  setFilters
}) => {

  /* State */
  const [value, setValue] = useState();

  const onInitData = () => {
    const monthTwo = moment(),
      monthOne = moment(monthTwo).subtract(1, "months");
    const date_one_from = monthOne.startOf("month").format("YYYY-MM-DD");
    const date_one_to = monthOne.endOf("month").format("YYYY-MM-DD");
    const date_two_from = monthTwo.startOf("month").format("YYYY-MM-DD");
    const date_two_to = monthTwo.endOf("month").format("YYYY-MM-DD");
    const date = {
      date_one: { from: date_one_from, to: date_one_to },
      date_two: { from: date_two_from, to: date_two_to },
    };
    const label = [monthOne.format("MM-YYYY"), monthTwo.format("MM-YYYY")];

    setFilters({ date, label });
    setValue([monthOne, monthTwo]);
  };

  const onOk = (value) => {
    const monthOne = value[0],
      monthTwo = value[1];
    const date_one_from = monthOne.startOf("month").format("YYYY-MM-DD");
    const date_one_to = monthOne.endOf("month").format("YYYY-MM-DD");
    const date_two_from = monthTwo.startOf("month").format("YYYY-MM-DD");
    const date_two_to = monthTwo.endOf("month").format("YYYY-MM-DD");
    const date = {
      date_one: { from: date_one_from, to: date_one_to },
      date_two: { from: date_two_from, to: date_two_to },
    };
    const label = [monthOne.format("MM-YYYY"), monthTwo.format("MM-YYYY")];

    setFilters({ date, label });
  };

  const onPanelChange = (value) => {
    setValue(value);
  };

  useEffect(() => {
    onInitData();
  }, []);

  return (
    <div className="header-card">
      <h4>BIỂU ĐỒ THỐNG KÊ LỖI VI PHẠM</h4>
      <div
        className="header-filter"
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <span className="filter-label">Chọn tháng: </span>
        <RangePicker
          dropdownClassName="header-picker"
          format="YYYY-MM"
          mode={["month", "month"]}
          showTime={{
            defaultValue: value,
          }}
          value={value}
          onPanelChange={onPanelChange}
          onOk={onOk}
        />
      </div>
    </div>
  );
};

export default HeaderCard;
