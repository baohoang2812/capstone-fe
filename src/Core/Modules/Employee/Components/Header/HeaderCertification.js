import React from "react";
import { Button } from "antd";
import jwt_decode from "jwt-decode";

const Header = ({ breadcrumb, action, icon = "plus", text, className }) => {
  const token =localStorage.getItem("token" || "");
  const{
    roleName:role,
  } = jwt_decode(token);



  const handleClick =() => {
     action();
    };

  
  
  return (
    <div className="content-header-page">
      <div className="content-header-add">
        <div className="content-header-wrapper">
          <div className="content-breadcrumb">
            <div className="breadcrumb">
              <div className="nav-left">
                {/* <div className="btn-bookmark">
                  <Icon type="star" theme="filled" />
                </div> */}
                {/* <NavBreadcrumbContentHeader data={breadcrumb} /> */}
              </div>
              <div className= "nav-right btn-group">
                {role=== "Admin" ? (<Button onClick={handleClick} className={className}>
                  <span>{text}</span>
                </Button>) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
