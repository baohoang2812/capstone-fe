import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["admin","Branch Manager","Staff"],
  name: "Notification",
  dir: "Notification",
  pathRoot: "notification",
  title: (
    <span>
     <Icon type="team" />
      <span>Notification</span>
    </span>
  ),
  showMenu: true,
  routes: [
    {
      url: "profile",
      component: "Pages/Profile",
      key: "profile-edit",
      showMenu: false,
      title: "Profile",
    },
    {
      url: ":id",
      component: "Pages/NotificationDetail",
      key: "Notification-create-edit",
      showMenu: false,
      title: "Notification detail",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "Notification Management",
    },
  ],
  redux: redux,
  sagas: sagas,
  lang: {
    vi: intlMessagesVi,
    en: intlMessagesEN,
  },
  isAuthenticate: true,
};
