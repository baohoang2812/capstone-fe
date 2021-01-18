import "./bootstrap.less";
import React, { useState } from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  name: "User",
  dir: "User",
  pathRoot: "user",
  title: ( 
    <span>
      <Icon type="user" />
      <span>User</span>
    </span>
  ),
  showMenu: true,
  routes: [
    {
      url: ":id/edit",
      component: "Pages/CreateEdit",
      key: "user-create-edit",
      showMenu: true,
      title: "Update user",
    },
    {
      url: "",
      component: "Pages",
      key: "user-list",
      showMenu: true,
      title: "User Management",
      subMenu: [
        {
          url: ":id/edit",
          component: "Pages/CreateEdit",
          key: "user-create-edit",
          showMenu: true,
          title: "Update user",
        },
        {
          url: "",
          component: "Pages",
          key: "user-list",
          showMenu: true,
          title: "User Management",
      }
      ]
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
