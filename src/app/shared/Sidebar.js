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
