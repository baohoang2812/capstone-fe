import React, {  } from "react";
import { DatePicker } from "antd";
import moment from "moment";
const { MonthPicker } = DatePicker;
const HeaderCard = ({setFromDate,setToDate})=> {
  /* State */
  const changeMonth = (value) => {
    if(value!==null){
      const startMonth=moment(value).startOf('month').format("YYYY-MM-DD");
      const endMonth=moment(value).endOf('month').format("YYYY-MM-DD");
      setFromDate(startMonth);
      setToDate(endMonth);
      
    }
  };
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().subtract(1,'month');
  }

  return (
    <div className ="header-card">
      <h4>BIỂU ĐỒ THỐNG KÊ LỖI VI PHẠM</h4>
     
      <div
        className="header-filter"
        style={{flex: 1, justifyContent: "flex-end" }}
      >
        <span className="filter-label">Chọn tháng: </span>
        <MonthPicker disabledDate={disabledDate} defaultValue={moment().subtract(1,'month')} onChange={changeMonth} placeholder="Select Month" />
      </div>
    </div>
  );
};

export default HeaderCard;
