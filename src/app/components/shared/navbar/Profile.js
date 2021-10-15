import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import firebase from "firebase/app";
import { Redirect } from "react-router-dom";

export function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    let isMounted = true;
    const dbRef = firebase.database().ref();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dbRef
          .child(`usuarios/${user.uid}`)
          .get()
          .then((snapshot) => {
            if (isMounted) {
              if (snapshot.exists()) {
                setUser({ ...snapshot.val() });
              } else {
                console.log("No data available");
                setUser({});
              }
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("no user");
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {});
    return <Redirect to={"/user-pages/login-1"} />;
  };

  return (
    <ul className="navbar-nav navbar-nav-right">
      <Dropdown alignRight as="li" className="nav-item">
        <Dropdown.Toggle as="a" className="nav-link cursor-pointer no-caret">
          <div className="navbar-profile">
            <p className="mb-0 d-none d-sm-block navbar-profile-name">
              <span>
                {user.nome}
                <code>({user.tipo_atual})</code>
              </span>
            </p>
            <i className="mdi mdi-menu-down d-none d-sm-block"></i>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
          <h6 className="p-3 mb-0">
            <span>Profile</span>
          </h6>
          <Dropdown.Divider />
          <Dropdown.Item
            href="!#"
            onClick={(evt) => evt.preventDefault()}
            className="preview-item"
          >
            <div className="preview-thumbnail">
              <div className="preview-icon bg-dark rounded-circle">
                <i className="mdi mdi-settings text-success"></i>
              </div>
            </div>
            <div className="preview-item-content">
              <p className="preview-subject mb-1">
                <span>Settings</span>
              </p>
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            href="!#"
            onClick={() => handleLogout()}
            className="preview-item"
          >
            <div className="preview-thumbnail">
              <div className="preview-icon bg-dark rounded-circle">
                <i className="mdi mdi-logout text-danger"></i>
              </div>
            </div>
            <div className="preview-item-content">
              <p className="preview-subject mb-1">
                <span>Log Out</span>
              </p>
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          <p className="p-3 mb-0 text-center">
            <span>Advanced settings</span>
          </p>
        </Dropdown.Menu>
      </Dropdown>
    </ul>
  );
}
