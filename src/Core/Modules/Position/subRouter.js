import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["admin"],
  name: "Position",
  dir: "Position",
  pathRoot: "position",
  title: (t) => {
    return (
    <span>
      <Icon type="team" />
      <span>{t("CORE.POSITION")}</span>
    </span>
  )},
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
      component: "Pages/PositionDetail",
      key: "position-create-edit",
      showMenu: false,
      title: "CORE.POSITION.DETAIL",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "CORE.POSITION.MANAGEMENT.TITLE",
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
