
import React from "react";
import { Link } from "react-router-dom";
import { Icon, Menu } from "antd";

export default ({ urlModules = [], setActive}) => {
  return urlModules.map((item, index) => {
    const { show = true } = item;
    let child = [];

    if (Object.values(item.child).length > 0) {
      child = Object.values(item.child).sort((a, b) =>
        a.position > b.position ? 1 : -1
      );
    }
    
    return show ? (
      <Menu.Item
        key={"menu" + index}
        id={"menu" + item.key}
        className={child.length > 0 ? "has-submenu" : ""}
        onClick={(e) => setActive(e)}
      >
        <Link to={item.url}>
          {item.title} &nbsp;
          {child.length > 0 ? <Icon type="down" /> : null}
        </Link>
        {child.length > 0 ? (
          <ul className="nav-submenu">
            {child.map((v, i) => (
              <li key={"menuChild" + i} onClick={(e) => setActive(e)}>
                <Link to={v.url}>{v.title} </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </Menu.Item>
    ) : null;
  })
};