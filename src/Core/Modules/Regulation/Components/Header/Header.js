import React from "react";
import { Icon, Button } from "antd";

/* Components */
import NavBreadcrumbContentHeader from "~/Core/Components/common/NavBreadcrumbContentHeader";

const Header = ({ breadcrumb, action, icon = "plus", text, className,isDisplay=true }) => {
  const handleClick = () => {
    action();
  };

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
               { isDisplay?
               <Button onClick={handleClick} className={className}>
                  <span>{text}</span>
                </Button> :null
               }  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
