import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function TableAdm() {
  const [data, setData] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    let isMounted = true;
    //pegar todos usuários e colocar em data
    const dbRef = firebase.database().ref();
    dbRef
      .child(`/usuarios`)
      .get()
      .then((snapshot) => {
        if (isMounted) {
          if (snapshot.exists()) {
            // console.log(snapshot.val());
            setData({ ...snapshot.val() });
          } else {
            console.log("No data available");
            setData({});
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
    //pegar usuário atual e colocar em user
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
      setData({});
      setUser({});
    };
  }, []);

  const handleAccepted = (data, id) => {
    var postData = {
      data_criacao: data.data_criacao,
      email: data.email,
      hora_criacao: data.hora_criacao,
      id_filial: data.id_filial,
      nome: data.nome,
      //tipo_atual será o único atributo mudado no banco
      tipo_atual: data.tipo_requisicao,
      tipo_requisicao: data.tipo_requisicao,
    };
    var update = {};
    update["usuarios/" + id] = postData;
    // console.log(data);
    // console.log(id);
    firebase
      .database()
      .ref()
      .update(update)
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        toast.error("Algo deu errado", {
          theme: "dark",
        });
      });
  };

  const handleRefused = (data, id) => {
    console.log(user);
  };
  return (
    <div className="row ">
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <h4>Solicitações de acesso para administrador</h4>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th> Nome do Funcionário </th>
                    <th> Tipo de requisição </th>
                    <th> Email </th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data)
                    .reverse()
                    .slice()
                    .map((id) => {
                      if (data[id].tipo_atual === "novo") {
                        return (
                          <tr key={id}>
                            <td> {data[id].nome} </td>
                            <td> {data[id].tipo_requisicao} </td>
                            <td> {data[id].email} </td>
                            <td>
                              <div className="template-demo">
                                <button
                                  type="button"
                                  className="btn btn-outline-success btn-fw"
                                  onClick={() => handleAccepted(data[id], id)}
                                >
                                  Aceitar
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-fw"
                                  onClick={() => handleRefused(data[id], id)}
                                >
                                  Recusar
                                </button>
                                <ToastContainer limit={3} />
                              </div>
                            </td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
