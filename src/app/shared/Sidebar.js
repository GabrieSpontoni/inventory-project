import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse, Dropdown } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";

class Sidebar extends Component {
  state = {};
  user = {};

  componentDidMount() {
    this._isMounted = true;
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
    const dbRef = firebase.database().ref();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dbRef
          .child(`usuarios/${user.uid}`)
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              this.setState({
                username: snapshot.val().nome,
                tipo_atual: snapshot.val().tipo_atual,
              });

              this.user = {
                username: snapshot.val().nome,
                tipo_atual: snapshot.val().tipo_atual,
              };
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("no user");
      }
    });
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
    this.setState({
      username: this.user.username,
      tipo_atual: this.user.tipo_atual,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/actions", state: "registerMenuOpen" },
      { path: "/management", state: "managementMenuOpen" },
      { path: "/permanent-management", state: "permanentManagementMenuOpen" },
      { path: "/development", state: "developmentMenuOpen" },
      { path: "/tables", state: "tablesMenuOpen" },
      { path: "/icons", state: "iconsMenuOpen" },
      { path: "/charts", state: "chartsMenuOpen" },
      { path: "/error-pages", state: "errorPagesMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
    this.setState({
      username: this.user.username,
      tipo_atual: this.user.tipo_atual,
    });
  }

  render() {
    const handleLogout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {})
        .catch((error) => {});
      return <Redirect to={"/user-pages/login-1"} />;
    };
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a
            className="sidebar-brand brand-logo"
            href="/dashboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            <h2>Nexsolar</h2>
          </a>
        </div>

        <ul className="nav">
          {this.state.username && (
            <li className="nav-item profile">
              <div className="profile-desc">
                <div className="profile-pic">
                  <div className="profile-name">
                    <h5 className="mb-0 font-weight-normal">
                      <div>
                        {this.state.username.split(" ").slice(0, 2).join(" ")}
                      </div>
                    </h5>
                    <span>
                      <div>{this.state.tipo_atual}</div>
                    </span>
                  </div>
                </div>
                <Dropdown alignRight>
                  <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                    <i className="mdi mdi-dots-vertical"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="sidebar-dropdown preview-list">
                    <a
                      href="!#"
                      className="dropdown-item preview-item"
                      onClick={handleLogout}
                    >
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-logout-variant text-danger"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1 text-small">
                          Sair
                        </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </li>
          )}
          <li className="nav-item nav-category">
            <span className="nav-link">
              <div>Estoque</div>
            </span>
          </li>
          <li
            className={
              this.isPathActive("/dashboard")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon">
                <i className="mdi mdi-speedometer"></i>
              </span>
              <span className="menu-title">
                <div>Dashboard</div>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/actions")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.registerMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("registerMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-database-plus"></i>
              </span>
              <span className="menu-title">
                <div>Ações</div>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.registerMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/actions/output")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/actions/output"
                    >
                      <div>Retiradas</div>
                    </Link>
                    <Link
                      className={
                        this.isPathActive("/actions/return")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/actions/return"
                    >
                      <div>Devoluções</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>

          {(this.state.tipo_atual === "administrador" ||
            this.state.tipo_atual === "diretor" ||
            this.state.tipo_atual === "dev") && (
            <Fragment>
              <li className="nav-item nav-category">
                <span className="nav-link">
                  <div>Gerenciamento</div>
                </span>
              </li>

              <li
                className={
                  this.isPathActive("/management")
                    ? "nav-item menu-items active"
                    : "nav-item menu-items"
                }
              >
                <div
                  className={
                    this.state.managementMenuOpen
                      ? "nav-link menu-expanded"
                      : "nav-link"
                  }
                  onClick={() => this.toggleMenuState("managementMenuOpen")}
                  data-toggle="collapse"
                >
                  <span className="menu-icon">
                    <i className="mdi mdi-account-key"></i>
                  </span>
                  <span className="menu-title">
                    <div>Administração</div>
                  </span>
                  <i className="menu-arrow"></i>
                </div>
                <Collapse in={this.state.managementMenuOpen}>
                  <div>
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item">
                        {" "}
                        <Link
                          className={
                            this.isPathActive("/management/products-list")
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/management/products-list"
                        >
                          <div>Listar Produtos</div>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={
                            this.isPathActive("/management/new-product")
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/management/new-product"
                        >
                          <div>Novo Produto</div>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={
                            this.isPathActive("/management/constructions-list")
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/management/constructions-list"
                        >
                          <div>Listar Obras</div>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          className={
                            this.isPathActive("/management/new-constructions")
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/management/new-constructions"
                        >
                          <div>Nova Obra</div>
                        </Link>
                      </li>

                      <li className="nav-item">
                        {" "}
                        <Link
                          className={
                            this.isPathActive("/management/release-access")
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/management/release-access"
                        >
                          <div>Liberar acessos</div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Collapse>
              </li>
              <li
                className={
                  this.isPathActive("/permanent-management")
                    ? "nav-item menu-items active"
                    : "nav-item menu-items"
                }
              >
                <div
                  className={
                    this.state.permanentManagementMenuOpen
                      ? "nav-link menu-expanded"
                      : "nav-link"
                  }
                  onClick={() =>
                    this.toggleMenuState("permanentManagementMenuOpen")
                  }
                  data-toggle="collapse"
                >
                  <span className="menu-icon">
                    <i className="mdi mdi-account-key"></i>
                  </span>
                  <span className="menu-title">
                    <div>Adm. permanente</div>
                  </span>
                  <i className="menu-arrow"></i>
                </div>
                <Collapse in={this.state.permanentManagementMenuOpen}>
                  <div>
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item">
                        <Link
                          className={
                            this.isPathActive(
                              "/permanent-management/product-list"
                            )
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/permanent-management/product-list"
                        >
                          <div>Listar Prod permanentes</div>
                        </Link>
                        <Link
                          className={
                            this.isPathActive(
                              "/permanent-management/product-new"
                            )
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/permanent-management/product-new"
                        >
                          <div>Novo Prod permanente</div>
                        </Link>
                        <Link
                          className={
                            this.isPathActive(
                              "/permanent-management/category-list"
                            )
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/permanent-management/category-list"
                        >
                          <div>Listar Categorias</div>
                        </Link>
                        <Link
                          className={
                            this.isPathActive(
                              "/permanent-management/category-new"
                            )
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/permanent-management/category-new"
                        >
                          <div>Nova Categoria</div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Collapse>
              </li>
            </Fragment>
          )}
          {this.state.tipo_atual === "dev" && (
            <div>
              <li className="nav-item nav-category">
                <span className="nav-link">
                  <div>DEV</div>
                </span>
              </li>

              <li
                className={
                  this.isPathActive("/development")
                    ? "nav-item menu-items active"
                    : "nav-item menu-items"
                }
              >
                <div
                  className={
                    this.state.developmentMenuOpen
                      ? "nav-link menu-expanded"
                      : "nav-link"
                  }
                  onClick={() => this.toggleMenuState("developmentMenuOpen")}
                  data-toggle="collapse"
                >
                  <span className="menu-icon">
                    <i className="mdi mdi-alert"></i>
                  </span>
                  <span className="menu-title">
                    <div>RESTRITO</div>
                  </span>
                  <i className="menu-arrow"></i>
                </div>
                <Collapse in={this.state.developmentMenuOpen}>
                  <div>
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item">
                        <Link
                          className={
                            this.isPathActive("/development/new-branch")
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to="/development/new-branch"
                        >
                          <div>NOVA FILIAL</div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Collapse>
              </li>
            </div>
          )}
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Sidebar);
