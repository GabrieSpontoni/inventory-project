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
const NewProduct = lazy(() => import("./management/NewProduct"));
const NewConstructions = lazy(() => import("./management/NewConstructions"));
const ConstructionsList = lazy(() => import("./management/ConstructionsList"));
const ConstructionsEdit = lazy(() => import("./management/ConstructionsEdit"));
const ReleaseAccess = lazy(() => import("./management/ReleaseAccess"));
const ProductsListPhotos = lazy(() =>
  import("./management/ProductsListPhotos")
);
const ProductsEdit = lazy(() => import("./management/ProductsListEdit"));
const NewCategory = lazy(() => import("./permanent-management/NewCategory"));
const ListCategory = lazy(() => import("./permanent-management/ListCategory"));
const NewProductPermanent = lazy(() =>
  import("./permanent-management/NewProductPermanent")
);

const NewBranch = lazy(() => import("./dev/NewBranch"));
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
              path="/management/new-constructions"
              component={NewConstructions}
            />
            <PrivateRoute
              path="/management/constructions-list"
              component={ConstructionsList}
            />

            <PrivateRoute
              path="/management/constructions-list-edit/:idConstruction"
              component={ConstructionsEdit}
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

            <PrivateRoute
              path="/permanent-management/category-new"
              component={NewCategory}
            />

            <PrivateRoute
              path="/permanent-management/category-list"
              component={ListCategory}
            />

            <PrivateRoute
              path="/permanent-management/product-new"
              component={NewProductPermanent}
            />

            <PrivateRoute
              path="/development/new-branch"
              component={NewBranch}
            />

            <Route path="/user-pages/login-1" component={Login} />
            <Route path="/user-pages/register-1" component={Register1} />

            <Redirect to="/dashboard" />
          </Switch>
        </Suspense>
      </AuthProvider>
    );
  }
}

export default AppRoutes;
