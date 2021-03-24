import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import reportApi from "~/Core/Modules/Dashboard/Api";
import { set } from "lodash";
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

  return (
    <div className="header-card">
      <h4>BIỂU ĐỒ THỐNG KÊ LỖI VI PHẠM</h4>
      <div
        className="header-filter"
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <span className="filter-label">Chọn tháng: </span>
        <MonthPicker onChange={changeMonth} placeholder="Select Month" />
      </div>
    </div>
  );
};

export default HeaderCard;
