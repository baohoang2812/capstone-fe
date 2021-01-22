import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  name: "Violation",
  dir: "Violation",
  pathRoot: "violation",
  title: (
    <span>
      <Icon type="exception" />
      <span>violation</span>
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
      component: "Pages/ViolationDetail",
      key: "violation-create-edit",
      showMenu: false,
      title: "Violation detail",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "Violation Management",
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
