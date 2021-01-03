import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  name: "Authenticate",
  dir: "Authenticate",
  pathRoot: "",
  routes: [
    {
      url: "",
      component: "Page/Signin",
      menu: {
        key: "signin",
        position: 1,
        parent: 0,
        showMenu: false,
      },
      title: "Đăng nhập"
    },
  ],
  lang: { vi: intlMessagesVi, en: intlMessagesEN },
  isAuthenticate: false,
};
