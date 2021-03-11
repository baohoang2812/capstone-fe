import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["Branch Manager"],
  name: "Shift",
  dir: "Shift",
  pathRoot: "shift",
  title: (
    <span>
    <Icon type="calendar" />
      <span>Shift</span>
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
      component: "Pages/ShiftDetail",
      key: "shift-create-edit",
      showMenu: false,
      title: "Shift detail",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "Shift Management",
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
