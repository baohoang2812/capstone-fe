import "~/styles/layout/index.less";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout } from "antd";
import { useHistory, useLocation } from "react-router-dom";

/* Components */
import HeaderMaster from "~/Core/Components/HeaderMaster";
import SideBar from "~/Core/Components/SideBar";
import RouterMaster from "~/Core/Components/RouterMaster";


const { Content } = Layout;

const RoutesMaster = ({
  listRoutes,
  listUrl,
  listArrayRoutes
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
        history.push("/dashboard")
      }
    }
  }, [])

  return (
    <div className="site-app">
      <div className="main-page">
        <Layout className="main-wrapper">
          <Layout className="custom-sidebar content full-height">
                {isAuthenticated ? <SideBar url={listArrayRoutes} /> : null}
            <Content className={`main-content ${userImpersonation?.isImpersonation && "is-impersonation"}`}>
              {isAuthenticated ? <HeaderMaster url={listUrl} /> : null}
                <RouterMaster listRoutes={listRoutes} isAuthenticated={isAuthenticated}/>
            </Content>
          </Layout>
        </Layout>
      </div>
    </div>
  )
}

RoutesMaster.defaultProps = {
  listRoutes: [],
  listUrl: [],
  listArrayRoutes: []
}

export default RoutesMaster;