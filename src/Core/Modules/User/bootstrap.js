import "./bootstrap.less";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  name: "User",
  dir: "User",
  pathRoot: "user",
  routes: [
    {
      url: ":id/edit",
      component: "Pages/CreateEdit",
      menu: {
        key: "user-create-edit",
        showMenu: false,
      },
      title: "Update contact",
    },
    {
      url: "",
      component: "Pages",
      menu: {
        key: "user-list",
        showMenu: false,
      },
      title: "Contact Management | Forex - Solazu",
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
