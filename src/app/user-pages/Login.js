import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router";

export default function Login() {
  // const googleLogin = async () => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       console.log("ok");
  //     })
  //     .catch((error) => {
  //       console.log("erro");
  //     });
  // };
  const history = useHistory();

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require("../../assets/images/logo.svg")} alt="logo" />
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <Form className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="email"
                    placeholder="Username"
                    size="lg"
                    className="h-auto"
                  />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    size="lg"
                    className="h-auto"
                  />
                </Form.Group>
                <div className="mt-3">
                  <button
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={() => history.push("/dashboard")}
                  >
                    Sign
                  </button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>
                      Keep me signed in
                    </label>
                  </div>
                  <a
                    href="!#"
                    onClick={(event) => event.preventDefault()}
                    className="auth-link text-muted"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="mb-2">
                  <button
                    type="button"
                    className="btn btn-block btn-google auth-form-btn"
                  >
                    <i className="mdi mdi-google mr-2"></i>Entra com conta
                    Google
                  </button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Don't have an account?{" "}
                  <Link className="text-primary" to="/user-pages/register-1">
                    Create
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
