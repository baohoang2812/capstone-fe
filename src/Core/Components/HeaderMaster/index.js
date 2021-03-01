import "~/styles/components/header.less";
import "./style.less";

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Layout, Icon, Dropdown, Avatar, Menu, Badge, List, Card } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import MenuLanguage from "./MenuLanguage";

/* Components */
import MenuNotify from "./MenuNotify";
/* Helpers */
import { logout } from "~/Core/utils/helper/authenticate";

// import buttonInfo from "./ButtonInfo";

const { Header } = Layout;
// const { SubMenu } = Menu;

export const HeaderMaster = ({ url }) => {
  const t = useTranslate();

  /* Ref outside */
  const ref = useRef();

  /* State */
  // const [oldActiveElement, setOldActiveElement] = useState(null);
  // const [isHover, setHover] = useState(false);

  const handleClick = (e) => {
    if (ref?.current && !ref?.current?.contains(e.target)) {
      // setHover(false);
    }
  };

  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
  const { Meta } = Card;

  const clickMenuHover = () => {
    // setHover(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  // const setActive = ({ target }) => {
  //   let oldElement = oldActiveElement;
  //   let activeElement = target;
  //   setOldActiveElement(target);

  //   if (oldElement) {
  //     oldElement.parentElement.closest("li").classList.remove("active");
  //   }

  //   while (oldElement && oldElement.parentElement.closest(".has-submenu")) {
  //     oldElement.parentElement
  //       .closest(".has-submenu")
  //       .classList.remove("active");
  //     oldElement = oldElement.parentElement.closest(".has-submenu");
  //   }

  //   activeElement.parentElement.closest("li").classList.add("active");
  //   while (activeElement.parentElement.closest(".has-submenu")) {
  //     activeElement.parentElement
  //       .closest(".has-submenu")
  //       .classList.add("active");
  //     activeElement = activeElement.parentElement.closest(".has-submenu");
  //   }
  // };

  // const renderModuleMenu = (item, account_info, icon_name) => {
  //   if (item.subMenu) {
  //     return (
  //       <SubMenu
  //         popupClassName="has-submenu"
  //         title={
  //           <>
  //             {t(item.id, item.defaultMessage)}
  //             {icon_name !== "right" && (
  //               <Icon
  //                 className="ant-menu-submenu-arrow"
  //                 type="down"
  //                 style={{ fontSize: 10, marginLeft: 5 }}
  //               />
  //             )}
  //           </>
  //         }
  //         key={item.id}
  //       >
  //         <Menu.ItemGroup className="nav-submenu">
  //           {item.subMenu.map((subItem) =>
  //             renderModuleMenu(subItem, account_info, "right")
  //           )}
  //         </Menu.ItemGroup>
  //       </SubMenu>
  //     );
  //   } else {
  //     return (
  //       <Menu.Item key={item.id}>
  //         <Link to={item.route}>{t(item.id, item.defaultMessage)}</Link>
  //       </Menu.Item>
  //     );
  //   }
  // };

  const renderMenuProfile = (account_info, t) => (
    <Menu
      className="dropdown-menu dropdown-menu-profile"
      selectedKeys={[]}
      mode="vertical"
    >
      <Menu.Item key="terms">
        <Link to="/employee/profile">
          <Icon type="profile" />
          {t("CORE.EMPLOYEE.PROFILE.TITLE")}
        </Link>
      </Menu.Item>
      <Menu.Item key="terms">
        <Link to="/terms">
          <Icon type="setting" />
          {t("CORE.MENU.terms")}
        </Link>
      </Menu.Item>
      <Menu.Item onClick={() => logout()} key="logout">
        <Icon type="logout" />
        {t("CORE.logout")}
      </Menu.Item>
    </Menu>
  );

  const account_info = JSON.parse(localStorage.getItem("account_info" || "{}"));
  // let urlModules = {};
  // urlModules = Object.values(urlModules).sort((a, b) =>
  //   a.position > b.position ? 1 : -1
  // );

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
    </Header>
  );
};

export default HeaderMaster;
