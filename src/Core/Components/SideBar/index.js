// import "~/styles/components/header.less";
// import "./style.less";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const { SubMenu } = Menu;
const { Sider } = Layout;
export const SideBar = ({ url }) => {
  const t = useTranslate();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  const renderModuleMenu = (item) => {
    if (item.subMenu) {
      const title = typeof(item.title) === "string" ? item.title : item.title(t)
      return (
        <SubMenu   
          title={title}
          key={item.key}
        >
          {item.subMenu.map((subItem) =>
            renderModuleMenu(subItem)
          )}
        </SubMenu>
      );
    } else {
      if (item.showMenu) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.url}>{t(item.title, item.title)}</Link>
          </Menu.Item>
        );
      }
    }
  };
  return (
    <Sider width={250} collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="header-logo" style={{height: 92, backgroundColor: "rgb(1 30 58", color: "#fff", lineHeight: "92px", textAlign: "center", fontSize: 35}}>
            <img style={{height:90, width:90}} alt="logo" src="/favicon.png"/>
      </div>
      <div style={{display: "flex", backgroundColor: "#fff", height: "100%"}}>
        <Menu theme="dark" mode="inline">
          {
            url.map((item) => 
              renderModuleMenu(item)
            )
          }
        </Menu>
      </div>
    </Sider>
  );
}

export default SideBar;
