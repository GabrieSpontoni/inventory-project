import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterForm() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    toast.success(
      " Sua Solicitação foi armazenada em nosso banco de dados, por favor aguarde o administrador aprovar você",
      {
        theme: "dark",
        position: "bottom-center",
      }
    );
    console.log(data);
    reset();
  };

  return (
    <div className="d-flex align-items-center auth px-0 h-100">
      <div className="row w-100 mx-0">
        <div className="col-lg-4 mx-auto">
          <div className="card text-left py-5 px-4 px-sm-5">
            {/* <div className="brand-logo">
              <img
                src={require("../../../assets/images/nexsolar.svg")}
                alt="logo"
              />
            </div> */}
            <h4>Novo por aqui?</h4>
            <h6 className="font-weight-light">
              Se inscreva para ter acesso ao sistema em poucos passos
            </h6>
            <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="exampleInputUsername1"
                  placeholder="Username"
                  {...register("username")}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="exampleInputEmail1"
                  placeholder="Email"
                  {...register("email")}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  id="exampleFormControlSelect2"
                  {...register("branch")}
                >
                  <option>Branch</option>
                  <option>United States of America</option>
                  <option>United Kingdom</option>
                  <option>India</option>
                  <option>Germany</option>
                  <option>Argentina</option>
                </select>
              </div>

              <div className="mt-3">
                <button
                  type="submit"
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                >
                  SIGN UP
                </button>
                <ToastContainer limit={3} />
              </div>
              <div className="text-center mt-4 font-weight-light">
                Already have an account?{" "}
                <Link to="/user-pages/login-1" className="text-primary">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
