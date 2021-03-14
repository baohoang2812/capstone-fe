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
  title: (t) => {
    return (
    <span>
     <Icon type="notification" />
      <span>{t("CORE.NOTIFICATION")}</span>
    </span>
  )},
  showMenu: true,
  routes: [
    {
      url: ":id",
      component: "Pages/NotificationDetail",
      key: "Notification-create-edit",
      showMenu: false,
      title: "CORE.NOTIFICATION.DETAIL",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "CORE.NOTIFICATION.MANAGEMENT",
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
