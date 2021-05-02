import "~/styles/components/header.less";
import "./style.less";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Icon, Dropdown, Avatar, Menu, Badge, Modal, notification } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import MenuLanguage from "./MenuLanguage";

/* Components */
import MenuNotify from "./MenuNotify";
/* Helpers */
import { logout } from "~/Core/utils/helper/authenticate";
import ChangePasswordForm from "./Components/ChangePasswordForm";
import notiApi from "~/Core/Modules/Notification/Api";
import readNotiApi from "~/Core/Modules/Notification/Api/ReadAllApi";
import notiAccountNotifications from "~/Core/Api/AccountNotifications";
import profileApi from "~/Core/Modules/Profile/Api";
// import ChangePasswordForm from "./Components/ChangePasswordForm"
import ExcuseDetail from "~/Core/Components/HeaderMaster/Components/ExcuseDetail";

// import buttonInfo from "./ButtonInfo";

const { Header } = Layout;
// const { SubMenu } = Menu;
export const HeaderMaster = ({ url }) => {
  const [visible, setVisible] = useState(false);
  const t = useTranslate();
  const [visibleExcuse, setVisibleExcuse] = useState(false);
  const [data, setData] = useState({});
  const [imagePath, setImagePath] = useState("");

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
    console.log(false);
    setVisible(false);
  };
  const clickMenuHover = () => {
    // setHover(true);
  };
  const [countNoti, setCountNoti] = useState(0);
  const [listNoti, setListNoti] = useState([]);

  const [count, setCount] = React.useState(0);

  const callApi = () => {
    (async () => {
      const res = await notiApi.getList(0, 5);
      if (res.code !== 200) {
        return;
      }
      const data = res?.data?.result || [];

      listNoti?.length > 0 && data.forEach(item => {
        const is_new = checkNewNoti(item);
        if (is_new) {
          notification["error"]({
            message: item?.notification?.name,
            description: item?.notification?.description
          });
        }
      })
      const totalUnread = res?.data?.totalUnread;
      setCountNoti(totalUnread);
      setListNoti(data);
    })();
  };

  const checkNewNoti = (data) => {
    const result = listNoti?.some(item => isEqual(item, data))
    return !result
  }

  const isEqual = (first, second) => {
    return JSON.stringify(first) === JSON.stringify(second);
  }
  useEffect(() => {
    const timer = setInterval(() => tick(), 5000);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    callApi();
  }, [count]);

  const tick = () => {
    //let newCount = count < 60 ? count + 1 : 0
    setCount((prevState) => (prevState < 60 ? prevState + 1 : 0));
  };

  useEffect(() => {
    // document.addEventListener("click", handleClick);
    document.addEventListener("click", handleClick);
    return () => {
      // document.removeEventListener("click", handleClick);
      document.removeEventListener("click", handleClick);
    };
  });
  useEffect(() => {
    (async () => {
      // const res = await notiApi.getList(0, 5);
      // if (res.code !== 200) {
      //   return;
      // }
      // const data = res?.data?.totalUnread;
      // setCountNoti(data);

      const profile = await profileApi.getProfile();
      const imagePath = profile?.data?.imagePath;
      setImagePath(imagePath);
    })();
  }, []);
  const renderMenuProfile = (account_info, t) => (
    <Menu
      // className="dropdown-menu dropdown-menu-profile"
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

  const openModelExcuse = (data, id) => {
    setVisibleExcuse(true);
    setData(data);
    reactNoti(id)
  };
  const onMarkAllAsRead = async () => {
    const res = await readNotiApi.readAll();
    if (res.code === 200) {
      setCountNoti(0);
      const newList = listNoti?.map(item => {
        let object = item;
        if (object) {
          object.isRead = true
        }
        return object
      })
      setListNoti(newList);
    }
  }

  const reactNoti = async (id) => {
    if (countNoti !== 0) {
      const res = await notiAccountNotifications.readNoti(id);
      if (res?.code === 200) {
        setCountNoti(countNoti - 1);
        const newList = listNoti?.map(item => {
          let object = item;
          if (object && object?.notification?.id === id) {
            object.isRead = true
          }
          return object
        })
        setListNoti(newList);
      }
    }
  }
  const handleCloseModalExcuse = () => {
    setVisibleExcuse(false);
  };

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
            overlay={
              <MenuNotify onMarkAllAsRead={onMarkAllAsRead} listNoti={listNoti} setData={setData} openModelExcuse={openModelExcuse} />
            }
            trigger={["hover"]}
          >
            <div className="action-icon dropdown-notification">
              <Badge count={countNoti}>
                <Icon type="notification" />
              </Badge>
            </div>
          </Dropdown>
          <Modal
            title={t("CORE.VIOLATION.MANAGEMENT.TITLE")}
            visible={visibleExcuse}
            onCancel={handleCloseModalExcuse}
            footer={null}
            width="900px"
          >
            <ExcuseDetail ID={data} action={handleCloseModalExcuse} />
          </Modal>
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
                src={imagePath}
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
        footer={null}
      >
        <ChangePasswordForm action={handleCloseModal} />
      </Modal>
    </Header>
  );
};

export default HeaderMaster;
