import React from "react";
import { Icon, DatePicker } from "antd";
/* Components */
import NavBreadcrumbContentHeader from "~/Core/Components/common/NavBreadcrumbContentHeader";
import moment from "moment";

const { RangePicker } = DatePicker;

const Header = ({ breadcrumb, setDate }) => {
  const handleChange = (date, dateString)=>{
    setDate(dateString)
  }
  const disabledMonth = (current) => {
    // Can not select days before today and today
    return current && current >= moment().endOf("month");
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
              <RangePicker 
                onChange={handleChange}
                disabledDate={disabledMonth}
                defaultValue={[moment().startOf('month'), moment().endOf('month')]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
