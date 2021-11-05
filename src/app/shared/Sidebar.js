import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse } from "react-bootstrap";

class Sidebar extends Component {
  state = {};
  userState = {
    userPhoto:
      "https://static.vecteezy.com/ti/vetor-gratis/p1/2318271-icone-do-perfil-do-usuario-gr%C3%A1tis-vetor.jpg",
    userName: "Defalut",
  };

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
  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a
            className="sidebar-brand brand-logo"
            href="/dashboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            <h2>
              Nexsolar{" "}
              {/* <i
                style={{ color: "yellow" }}
                className="mdi mdi-white-balance-sunny"
              ></i> */}
            </h2>
          </a>
        </div>
        <ul className="nav">
          <li className="nav-item nav-category">
            <span className="nav-link">
              <div>Navigation</div>
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
              this.isPathActive("/cadastros")
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
                <div>Cadastrar ações</div>
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
                      <div>Retirada</div>
                    </Link>
                    <Link
                      className={
                        this.isPathActive("/actions/buttons")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/actions/buttons"
                    >
                      <div>Buttons</div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/actions/dropdowns")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/actions/dropdowns"
                    >
                      <div>Dropdowns</div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/actions/typography")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/actions/typography"
                    >
                      <div>Typography</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
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
                        this.isPathActive("/management/new-branch")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/management/new-branch"
                    >
                      <div>Nova Filial</div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/management/basic-elements")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/management/basic-elements"
                    >
                      <div>Basic Elements</div>
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
              this.isPathActive("/tables")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.tablesMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("tablesMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-table-large"></i>
              </span>
              <span className="menu-title">
                <div>Tables</div>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.tablesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/tables/basic-table")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/tables/basic-table"
                    >
                      <div>Basic Table</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/charts")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.chartsMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("chartsMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-chart-bar"></i>
              </span>
              <span className="menu-title">
                <div>Charts</div>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.chartsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/charts/chart-js")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/charts/chart-js"
                    >
                      <div>Chart Js</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/icons")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.iconsMenuOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("iconsMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-contacts"></i>
              </span>
              <span className="menu-title">
                <div>Icons</div>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.iconsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/icons/mdi")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/icons/mdi"
                    >
                      <div>Material</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">
              <div>More</div>
            </span>
          </li>
          <li
            className={
              this.isPathActive("/error-pages")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.errorPagesMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("errorPagesMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <span className="menu-title">
                <div>Error Pages</div>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.errorPagesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/error-pages/error-404")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/error-pages/error-404"
                    >
                      404
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/error-pages/error-500")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/error-pages/error-500"
                    >
                      500
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className="nav-item menu-items">
            <a
              className="nav-link"
              href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
              <span className="menu-title">
                <div>Documentation</div>
              </span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
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
  }
}

export default withRouter(Sidebar);
