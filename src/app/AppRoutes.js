import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "../app/shared/Spinner";
import { AuthProvider } from "../firebase/authContext/auth";
import PrivateRoute from "./PrivateRoute";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));

const Output = lazy(() => import("./actions/Output"));
const Return = lazy(() => import("./actions/Return"));
const ReturnEdit = lazy(() => import("./actions/ReturnEdit"));
const ReturnPhotos = lazy(() => import("./actions/ReturnPhotos"));
const Buttons = lazy(() => import("./actions/Buttons"));
const Dropdowns = lazy(() => import("./actions/Dropdowns"));
const Typography = lazy(() => import("./actions/Typography"));

const ProductsList = lazy(() => import("./management/ProductsList"));
const ReleaseAccess = lazy(() => import("./management/ReleaseAccess"));
const BasicElements = lazy(() => import("./management/BasicElements"));
const NewProduct = lazy(() => import("./management/NewProduct"));
const NewBranch = lazy(() => import("./management/NewBranch"));
const ProductsListPhotos = lazy(() =>
  import("./management/ProductsListPhotos")
);
const ProductsEdit = lazy(() => import("./management/ProductsListEdit"));

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
      <AuthProvider>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />

            <PrivateRoute path="/actions/output" component={Output} />
            <PrivateRoute path="/actions/return" component={Return} />
            <PrivateRoute
              path="/actions/return-form/:idAction"
              component={ReturnEdit}
            />
            <PrivateRoute
              path="/actions/return-photos/:idAction"
              component={ReturnPhotos}
            />
            <PrivateRoute path="/actions/buttons" component={Buttons} />
            <PrivateRoute path="/actions/dropdowns" component={Dropdowns} />
            <PrivateRoute path="/actions/typography" component={Typography} />
            <PrivateRoute
              path="/management/products-list"
              component={ProductsList}
            />
            <PrivateRoute
              path="/management/new-product"
              component={NewProduct}
            />
            <PrivateRoute path="/management/new-branch" component={NewBranch} />
            <PrivateRoute
              path="/management/release-access"
              component={ReleaseAccess}
            />
            <PrivateRoute
              path="/management/basic-elements"
              component={BasicElements}
            />

            <PrivateRoute
              path="/management/products-list-photos/:idProd"
              component={ProductsListPhotos}
            />
            <PrivateRoute
              path="/management/products-list-edit/:idProd"
              component={ProductsEdit}
            />

            <PrivateRoute path="/tables/basic-table" component={BasicTable} />

            <PrivateRoute path="/icons/mdi" component={Mdi} />

            <PrivateRoute path="/charts/chart-js" component={ChartJs} />

            <Route path="/user-pages/login-1" component={Login} />
            <Route path="/user-pages/register-1" component={Register1} />

            <Route path="/error-pages/error-404" component={Error404} />
            <Route path="/error-pages/error-500" component={Error500} />

            <Redirect to="/user-pages/login-1" />
          </Switch>
        </Suspense>
      </AuthProvider>
    );
  }
}

export default AppRoutes;
