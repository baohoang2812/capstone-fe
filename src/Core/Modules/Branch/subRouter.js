import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["admin"],
  name: "Branch",
  dir: "Branch",
  pathRoot: "branch",
  title: (t) => {
    return (
    <span>
      <Icon type="branches" />
      <span>{t("CORE.BRANCH")}</span>
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
      component: "Pages/BranchDetail",
      key: "branch-create-edit",
      showMenu: false,
      title: "CORE.BRANCH.UPDATE.ACCOUNT",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "CORE.BRANCH.MANAGEMENT",
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
