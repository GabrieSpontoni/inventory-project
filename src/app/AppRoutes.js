import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "../app/shared/Spinner";
import { AuthProvider } from "../firebase/authContext/auth";
import PrivateRoute from "./PrivateRoute";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const DashboardPhotos = lazy(() => import("./dashboard/DashboardPhotos"));

const Output = lazy(() => import("./actions/Output"));
const Return = lazy(() => import("./actions/Return"));
const ReturnEdit = lazy(() => import("./actions/ReturnEdit"));
const ReturnPhotos = lazy(() => import("./actions/ReturnPhotos"));

const ProductsList = lazy(() => import("./management/ProductsList"));
const ReleaseAccess = lazy(() => import("./management/ReleaseAccess"));
const NewProduct = lazy(() => import("./management/NewProduct"));
const NewBranch = lazy(() => import("./dev/NewBranch"));
const ProductsListPhotos = lazy(() =>
  import("./management/ProductsListPhotos")
);
const ProductsEdit = lazy(() => import("./management/ProductsListEdit"));

const Login = lazy(() => import("./user-pages/Login"));
const Register1 = lazy(() => import("./user-pages/Register"));

class AppRoutes extends Component {
  render() {
    return (
      <AuthProvider>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              path="/dashboard/dashboard-photos/:idProd"
              component={DashboardPhotos}
            />

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
            <PrivateRoute
              path="/management/products-list"
              component={ProductsList}
            />
            <PrivateRoute
              path="/management/new-product"
              component={NewProduct}
            />
            <PrivateRoute
              path="/development/new-branch"
              component={NewBranch}
            />
            <PrivateRoute
              path="/management/release-access"
              component={ReleaseAccess}
            />

            <PrivateRoute
              path="/management/products-list-photos/:idProd"
              component={ProductsListPhotos}
            />
            <PrivateRoute
              path="/management/products-list-edit/:idProd"
              component={ProductsEdit}
            />

            <Route path="/user-pages/login-1" component={Login} />
            <Route path="/user-pages/register-1" component={Register1} />

            <Redirect to="/user-pages/login-1" />
          </Switch>
        </Suspense>
      </AuthProvider>
    );
  }
}

export default AppRoutes;
