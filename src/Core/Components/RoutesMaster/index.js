import "~/styles/layout/index.less";

import React, { useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import { Layout } from "antd";
import { useHistory, useLocation, Switch, Redirect, Route } from "react-router-dom";

/* Components */
import HeaderMaster from "~/Core/Components/HeaderMaster";
import LoadableLoading from "~/Core/Components/LoadableLoading";
import NotFound from "~/Core/Modules/NotFound/Pages";

const { Content } = Layout;

const RoutesMaster = ({
  listRoutes,
  listUrl
}) => {

  /* Selector */
  const userImpersonation = useSelector(state => state.userImpersonation);

  const history = useHistory();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const isAuthenticated = token !== null && token !== undefined;

  useEffect(() => {

    if (isAuthenticated) {
      if (location.pathname === "/") {
        history.push("/user")
      }
    }
  }, [])

  return (
    <div className="site-app">
      <div className="main-page">
        <Layout className="main-wrapper">
          <Layout className="content full-height">
            <Content className={`main-content ${userImpersonation?.isImpersonation && "is-impersonation"}`}>
              {isAuthenticated ? <HeaderMaster url={listUrl} /> : null}
              <Suspense fallback={<LoadableLoading />}>
                <Switch>
                  {listRoutes}
                  {
                    isAuthenticated ? (
                      <Route
                        path="*"
                        component={NotFound}
                      />
                    ) : (
                      <Route
                        path="*"
                        render={() => <Redirect to="/" />}
                      />
                    )
                  }
                </Switch>
              </Suspense>
            </Content>
          </Layout>
        </Layout>
      </div>
    </div>
  )
}

RoutesMaster.defaultProps = {
  listRoutes: [],
  listUrl: []
}

export default RoutesMaster;