import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

export default function Login() {
  const { register, handleSubmit, reset } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    history.push("/dashboard");
  };

  return (
    <div>
      <div className="d-flex align-items-center auth px-0 h-100">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require("../../assets/images/logo.svg")} alt="logo" />
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email Nexsolar"
                    {...register("email")}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Senha"
                    {...register("password")}
                  />
                </div>
                <div className="mt-3">
                  <button
                    type="submit"
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  >
                    Sign
                  </button>
                </div>
                {/* <div className="my-2 d-flex justify-content-between align-items-center">
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
                </div> */}
                <div className="text-center mt-4 font-weight-light">
                  Don't have an account?{" "}
                  <Link className="text-primary" to="/user-pages/register-1">
                    Create
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
