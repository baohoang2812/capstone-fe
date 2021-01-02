import React from "react";
import { useHistory } from "react-router-dom"
import { Icon, Button } from "antd";

/* Components */
import NavBreadcrumbContentHeader from "~/Core/Components/common/NavBreadcrumbContentHeader";

const Header = ({ breadcrumb, to, icon = "plus", text }) => {
  const history = useHistory();

  const push = () => {
    history.push(to);
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
                <NavBreadcrumbContentHeader
                  data={breadcrumb}
                />
              </div>
              <div className="nav-right">
                <Button onClick={push}>
                  <Icon type={icon} />
                  <span>{text}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;
