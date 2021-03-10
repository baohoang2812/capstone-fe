import React from "react";
import { Icon} from "antd";

/* Components */
import NavBreadcrumbContentHeader from "~/Core/Components/common/NavBreadcrumbContentHeader";

const Header = ({ breadcrumb, action, icon = "plus", text, className }) => {
 

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
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
