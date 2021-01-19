import "~/styles/layout/index.less";

import React, { Suspense } from "react";
import { Switch, Redirect, Route } from "react-router-dom";

/* Components */
import LoadableLoading from "~/Core/Components/LoadableLoading";
import NotFound from "~/Core/Modules/NotFound/Pages";

const RoutesMaster = ({
  listRoutes,
  isAuthenticated
}) => {
  return (
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
  )
}

RoutesMaster.defaultProps = {
  listRoutes: [],
  isAuthenticated: Boolean
}

export default RoutesMaster;