import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  
  name: "Branch",
  dir: "Branch",
  pathRoot: "branch",
  title: (
    <span>
      <Icon type="branches" />
      <span>Branches</span>
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
      component: "Pages/BranchDetail",
      key: "branch-create-edit",
      showMenu: false,
      title: "Branch detail",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "Branch Management",
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
