import React from "react";
import { Icon, DatePicker } from "antd";

/* Components */
import NavBreadcrumbContentHeader from "~/Core/Components/common/NavBreadcrumbContentHeader";

import moment from "moment";

const Header = ({ breadcrumb, setDate, icon = "plus", text, className }) => {
  const handleChange = (date, dateString) => {
    setDate(date.format("YYYY-MM-DDTHH:mm:ssZ"))
  }
  const disabledDate = (current) => {
    // Can not select days before today and today
  
    return (current && current <= moment().endOf("day").subtract(4,"day")) || (current && current>=moment().endOf("day"));
  }
  return (
    <div className="content-header-page">
      <div className="content-header-add">
        <div className="content-header-wrapper">
          <div className="content-breadcrumb">
            <div className="breadcrumb">
              <div className="nav-left">
                <div className="btn-bookmark">
                  <Icon type="star" theme="filled" />
                </div>
                <NavBreadcrumbContentHeader data={breadcrumb} />
              </div>
              <div className="nav-right btn-group">
                <DatePicker disabledDate={disabledDate} onChange={handleChange} defaultValue={moment()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
