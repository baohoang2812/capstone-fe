import "~/styles/components/header.less";
import "./style.less";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Icon, Dropdown, Avatar, Menu, Badge, Modal } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import MenuLanguage from "./MenuLanguage";

/* Components */
import MenuNotify from "./MenuNotify";
/* Helpers */
import { logout } from "~/Core/utils/helper/authenticate";
import ChangePasswordForm from "./Components/ChangePasswordForm";
// import ChangePasswordForm from "./Components/ChangePasswordForm"


// import buttonInfo from "./ButtonInfo";

const { Header } = Layout;
// const { SubMenu } = Menu;
export const HeaderMaster = ({ url }) => {
  const [visible,setVisible]= useState(false);
  const t = useTranslate();

  /* Ref outside */
  const ref = useRef();
  const handleClick = (e) => {
    if (ref?.current && !ref?.current?.contains(e.target)) {
      // setHover(false);
    }
  };
  const openModel = (record) => {
    setVisible(true);
  };
  const handleCloseModal = () => {
    console.log(false)
    setVisible(false);
  };
  const clickMenuHover = () => {
    // setHover(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  const renderMenuProfile = (account_info, t) => (
    <Menu
      className="dropdown-menu dropdown-menu-profile"
      selectedKeys={[]}
      mode="vertical"
    >
      <Menu.Item key="terms">
        <Link to="/profile">
          <Icon type="profile" />
          {t("CORE.EMPLOYEE.PROFILE.TITLE")}
        </Link>
      </Menu.Item>
      <Menu.Item key="terms" onClick={openModel}>
        {/* <Link to="/terms"> */}
          <Icon type="setting" />
          {t("CORE.MENU.CHANGE.PASSWORD")}
        {/* </Link> */}
      </Menu.Item>
      <Menu.Item onClick={() => logout()} key="logout">
        <Icon type="logout" />
        {t("CORE.logout")}
      </Menu.Item>
    </Menu>
  );

  const account_info = JSON.parse(localStorage.getItem("account_info" || "{}"));
  return (
    <Header className="layout-header">
      <div className="layout-header-wrapper">
        <div className="header-left">
          <div className="header-logo">
            {/* <Link to="/user" className="logo">
              <img
                className="logo-image"
                src="/assets/images/RubikBotVertical.png"
                alt="logo"
              />
            </Link> */}
          </div>
          <div className="header-nav-menu" ref={ref} onClick={clickMenuHover}>
            {/* <Menu
              mode="horizontal"
              triggerSubMenuAction={isHover ? "hover" : "click"}
              style={{ backgroundColor: "transparent" }}
            >
              {buttonInfo.map((item) => renderModuleMenu(item, account_info))}
              <ItemsModules urlModules={urlModules} setActive={setActive} />
            </Menu> */}
          </div>
        </div>
        <div className="header-right">
          <Dropdown
            overlay={<MenuNotify />}
            trigger={["click"]}
          >
            <div className="action-icon dropdown-notification">
              <Badge count={22}>
                <Icon type="notification" />
              </Badge>
            </div>
          </Dropdown>
          <MenuLanguage />
          <Dropdown overlay={renderMenuProfile(account_info, t)}>
            <span className="dropdown-user">
              <span
                style={{
                  padding: "5px 15px",
                  borderLeft: "1px solid",
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                {account_info.full_name}
              </span>
              <Avatar
                style={{ backgroundColor: "white" }}
                size="middle"
                className="avatar"
                src={account_info.image_path}
                alt="avatar"
              />
            </span>
          </Dropdown>
        </div>
      </div>
      <Modal
        title={t("CORE.changePass")}
        visible={visible}
        onCancel={handleCloseModal}
        footer={null}>
        <ChangePasswordForm action={handleCloseModal}/>
      </Modal>
    </Header>
  );
};

export default HeaderMaster;
