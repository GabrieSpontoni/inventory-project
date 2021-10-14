import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";

export default function RegisterForm() {
  const { register, handleSubmit, reset } = useForm();
  const [branchs, setBranchs] = useState({});

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef
      .child("filiais")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          setBranchs(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        // console.error(error);
      });
  }, []);

  const onSubmit = (data) => {
    toast.info("Estamos criando sua conta", {
      icon: "⌛",
      theme: "dark",
    });
    // console.log(data);
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = date.getFullYear();
    const today = `${dd}/${mm}/${yyyy}`;
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hour = date.getHours();
    const time = `${hour}:${minutes}:${seconds}`;

    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        const userRef = firebase
          .database()
          .ref(`usuarios/${userCredential.user.uid}`);
        const newUserRef = userRef;

        newUserRef
          .set({
            nome: data.full_name,
            email: data.email,
            id_filial: data.branch_id,
            tipo_requisicao: data.type_request,
            tipo_atual: "novo",
            data_criacao: today,
            hora_criacao: time,
          })
          .then(() => {
            toast.success(
              "Sua Solicitação foi armazenada em nosso banco de dados, por favor aguarde o administrador aprovar você",
              {
                theme: "dark",
                position: "bottom-center",
              }
            );
          })
          .catch(() => {
            toast.error("Algo deu errado tente novamente", {
              theme: "dark",
              position: "bottom-center",
            });
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, {
          theme: "dark",
          position: "bottom-center",
        });
      });

    toast.clearWaitingQueue();
    reset();
  };

  return (
    <div className="d-flex align-items-center auth px-0 h-100">
      <div className="row w-100 mx-0">
        <div className="col-lg-4 mx-auto">
          <div className="card text-left py-5 px-4 px-sm-5">
            <h4>Novo por aqui?</h4>
            <h6 className="font-weight-light">
              Se inscreva para ter acesso ao sistema em poucos passos
            </h6>
            <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Nome Completo"
                  required
                  {...register("full_name")}
                />
              </div>
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
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  defaultValue=""
                  required
                  {...register("branch_id")}
                >
                  <option value="" disabled hidden>
                    Filial da Nexsolar
                  </option>
                  {Object.keys(branchs).map((id, value) => {
                    return (
                      <option key={id} value={id}>
                        {branchs[id].localizacao.cidade} ,{" "}
                        {branchs[id].localizacao.estado} -{" "}
                        {branchs[id].localizacao.pais}{" "}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <select
                  defaultValue=""
                  className="form-control form-control-lg"
                  required
                  {...register("type_request")}
                >
                  <option value="" disabled hidden>
                    Tipo de Usuário
                  </option>
                  <option value="administrador">Administrador</option>
                  <option value="funcionario">Funcionário</option>
                  );
                </select>
                <p className="card-description">
                  <code>administrador :</code> é possível cadastrar novos
                  produtos que chegam ao estoque, selecione esta opção apenas se
                  você possui controle de estoque
                </p>
                <p className="card-description">
                  <code>funcionário :</code>
                  esse perfil é voltada para quem faz retirada e devoluções de
                  produtos do estoque
                </p>
              </div>

              <div className="mt-3">
                <button
                  type="submit"
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                >
                  Criar Conta
                </button>
                <ToastContainer limit={3} />
              </div>
              <div className="text-center mt-4 font-weight-light">
                Já tem uma conta ?{" "}
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
