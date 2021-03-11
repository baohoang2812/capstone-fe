import React, { lazy } from "react";
import { Route } from "react-router-dom";
import Helmet from "react-helmet";

import Modules from "~/Core/Modules";
import { checkRole } from "~/Core/Modules/Authenticate/helpers";

/* Components */
import ErrorBoundary from "~/Core/Components/common/ErrorBoundary";

export async function initApp(isAuthenticated, AccountInfo) {
  let resModules = {
    listRoutes: {},
    listUrl: {},
    listArrayRoutes: [],
    listRedux: {},
    listSagas: [],
    listLangVi: {},
    listLangEn: {}
  };
  resModules = await initModules(isAuthenticated, AccountInfo);
  return { resModules };
}

async function initModules(isAuthenticated) {
  try {
    let listRoutes = {};
    let listUrl = {};
    let listArrayRoutes = [];
    let listRedux = {};
    let listSagas = [];
    let listLangVi = {};
    let listLangEn = {};

    for (let i = 0; i < Modules.length; i++) {
      const module = Modules[i];
      let res = null;

      try {
        res = require("~/Core/Modules/" + module.key + "/subRouter");
      } catch (error) {
        console.log(`Module ${module.key} does not exist!`);
      }

      if (res) {
        const { default: moduleConfig } = res;

        const moduleAuthenticated =
          moduleConfig.isAuthenticate !== undefined
            ? moduleConfig.isAuthenticate
            : true;
        if (
          (isAuthenticated === moduleAuthenticated) ||
          moduleAuthenticated === "Any"
        ) {
          const roleName = moduleConfig.roleName;
          if (moduleConfig.sagas !== undefined && checkRole(roleName)) {
            listSagas = [...listSagas, ...moduleConfig.sagas];
          }
          if (moduleConfig.routes !== undefined && checkRole(roleName)) {
            if ( moduleConfig.showMenu ) {
              listArrayRoutes.push({
                title: moduleConfig.title,
                key: moduleConfig.pathRoot,
                subMenu: moduleConfig.routes
              })
            }  

            for (let j = 0; j < moduleConfig.routes.length; j++) {
              const route = moduleConfig.routes[j];
              const { component, path } = createRouterModule(
                route,
                moduleConfig.dir,
                moduleConfig.pathRoot === undefined ? "" : moduleConfig.pathRoot,
                listUrl
              );
              listRoutes[path] = component;
              if (route.showMenu === undefined || route.showMenu === true) {
                route["url"] = path;
                listUrl[path] = route;
              }
              if (moduleConfig.redux !== undefined) {
                listRedux = { ...listRedux, ...moduleConfig.redux };
              }
              if (moduleConfig.lang !== undefined) {
                if (moduleConfig.lang.vi !== undefined) {
                  listLangVi = { ...listLangVi, ...moduleConfig.lang.vi };
                }
                if (moduleConfig.lang.en !== undefined) {
                  listLangEn = { ...listLangEn, ...moduleConfig.lang.en };
                }
              }
            }
          }
        }
      }
    }
    console.log(listUrl);
    return {
      listRoutes,
      listUrl,
      listArrayRoutes,
      listRedux,
      listSagas,
      listLangVi,
      listLangEn
    };
  } catch (e) {
    console.log(e)
  }
}

function RouteWithTitle({ title, ...props }) {
  return (
    <ErrorBoundary>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Route {...props} />
    </ErrorBoundary>
  );
}

function createRouterModule(route, moduleDir, pathRoot) {
  const pathR = pathRoot !== undefined && pathRoot ? "/" + pathRoot + "/" : "/";
  const lazyComponent = lazy(() => import(
    /* webpackChunkName: "[request]" */
    "~/Core/Modules/" + moduleDir + "/" + route.component
  ));
  
  return {
    component: (
      <RouteWithTitle
        title={route.title}
        key={"routerModules" + moduleDir}
        path={pathR + route.url}
        component={lazyComponent}
      />
    ),
    path: pathR + route.url
  };
}
