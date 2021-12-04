import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import firebase from "firebase/app";

import "react-toastify/dist/ReactToastify.css";
// import { AuthContext } from "../../firebase/authContext/auth";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        firebase
          .database()
          .ref(`/usuarios/${userCredential.user.uid}`)
          .once("value", (snapshot) => {
            if (snapshot.val().tipo_atual !== "novo") {
              history.push("/dashboard");
            } else {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  console.log("deslogado");
                })
                .catch((error) => {
                  // An error happened.
                });
              toast.info(
                "Conta ainda não aprovada, por favor aguarde aprovação",
                {
                  theme: "dark",
                  position: "bottom-center",
                }
              );
              setLoading(false);
            }
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Email ou senha incorreto", {
          theme: "dark",
          position: "bottom-center",
        });
        setLoading(false);
      });
  };

  // const { currentUser } = useContext(AuthContext);
  // if (currentUser) {
  //   return <Redirect to="/dashboard" />;
  // }

  return (
    <div>
      <div className="d-flex align-items-center auth px-0 h-100 ">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-center py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img
                  src={require("../../assets/images/logoNexSolar.png")}
                  alt="logo"
                  style={{ width: "250px" }}
                />
              </div>
              <h4>Gerenciamento de estoque Nexsolar.</h4>
              <h6 className="font-weight-light">Faça login para continuar.</h6>
              <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    required
                    {...register("email")}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Senha"
                    required
                    {...register("password")}
                  />
                </div>
                {!loading && (
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    >
                      Login
                    </button>
                  </div>
                )}
                {loading && (
                  <div className="mt-3">
                    <CircularProgress />
                  </div>
                )}
                <div className="text-center mt-4 font-weight-light">
                  Não tem uma conta?{" "}
                  <Link className="text-primary" to="/user-pages/register-1">
                    Criar
                  </Link>
                </div>
              </form>
              <ToastContainer limit={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
