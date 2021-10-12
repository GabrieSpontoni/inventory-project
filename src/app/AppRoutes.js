import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "../app/shared/Spinner";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));

const NewProduct = lazy(() => import("./registration/NewProduct"));
const NewBranch = lazy(() => import("./registration/NewBranch"));
const Output = lazy(() => import("./registration/Output"));
const Buttons = lazy(() => import("./registration/Buttons"));
const Dropdowns = lazy(() => import("./registration/Dropdowns"));
const Typography = lazy(() => import("./registration/Typography"));

const BasicElements = lazy(() => import("./form-elements/BasicElements"));

const BasicTable = lazy(() => import("./tables/BasicTable"));

const Mdi = lazy(() => import("./icons/Mdi"));

const ChartJs = lazy(() => import("./charts/ChartJs"));

const Error404 = lazy(() => import("./error-pages/Error404"));
const Error500 = lazy(() => import("./error-pages/Error500"));

const Login = lazy(() => import("./user-pages/Login"));
const Register1 = lazy(() => import("./user-pages/Register"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />

          <Route path="/registration/new-product" component={NewProduct} />
          <Route path="/registration/new-branch" component={NewBranch} />
          <Route path="/registration/output" component={Output} />
          <Route path="/registration/buttons" component={Buttons} />
          <Route path="/registration/dropdowns" component={Dropdowns} />
          <Route path="/registration/typography" component={Typography} />

          <Route
            path="/form-Elements/basic-elements"
            component={BasicElements}
          />

          <Route path="/tables/basic-table" component={BasicTable} />

          <Route path="/icons/mdi" component={Mdi} />

          <Route path="/charts/chart-js" component={ChartJs} />

          <Route path="/user-pages/login-1" component={Login} />
          <Route path="/user-pages/register-1" component={Register1} />

          <Route path="/error-pages/error-404" component={Error404} />
          <Route path="/error-pages/error-500" component={Error500} />

          <Redirect to="/user-pages/login-1" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
