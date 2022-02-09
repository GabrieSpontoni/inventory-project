import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { CircularProgress } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";

function Constructions() {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState(null);

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    let isMounted = true;
    if (user) {
      firebase
        .database()
        .ref(`/filiais/${user.id_filial}/obras/`)
        .once("value", (snapshot) => {
          if (isMounted) {
            const items = [];

            snapshot.forEach((childSnapshot) => {
              items[childSnapshot.key] = childSnapshot.val();
            });
            setData(items);
          }
        });

      firebase
        .database()
        .ref(`/usuarios/`)
        .once("value", (snapshot) => {
          if (isMounted) {
            const users = [];

            snapshot.forEach((childSnapshot) => {
              users[childSnapshot.key] = childSnapshot.val();
            });
            setUsersList(users);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    if (data && usersList && user) {
      setLoading(false);
    }
  }, [data, usersList, user]);

  const handleEditConstruction = (id) => {
    history.push(`/management/constructions-list-edit/${id}`);
  };

  return (
    <div className="row ">
      {loading && (
        <CircularProgress style={{ marginLeft: "50%", marginTop: "20%" }} />
      )}
      {!loading &&
        (user.tipo_atual === "dev" ||
          user.tipo_atual === "diretor" ||
          user.tipo_atual === "administrador") && (
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Obras</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Usuário </th>
                        <th> Nome da Obra </th>
                        <th> Endereço </th>
                        <th> Cidade </th>
                        <th> Responsável </th>

                        <th> Hora do Cadastro </th>
                        <th> Data do Cadastro </th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        usersList &&
                        Object.keys(data).map((id) => {
                          return (
                            <tr key={id}>
                              <td>
                                {usersList[data[id].id_usuario] !== undefined
                                  ? usersList[data[id].id_usuario].nome
                                      .split(" ")
                                      .slice(0, 2)
                                      .join(" ")
                                  : data[id].id_usuario}
                              </td>
                              <td> {data[id].nome_obra} </td>
                              <td> {data[id].endereco_obra} </td>
                              <td> {data[id].cidade_obra}</td>
                              <td> {data[id].responsavel}</td>
                              <td> {data[id].hora}</td>
                              <td> {data[id].data}</td>
                              <td style={{ display: "flex" }}>
                                <button
                                  style={{ display: "flex" }}
                                  type="button"
                                  className="btn btn-warning btn-icon-text"
                                  onClick={() => {
                                    handleEditConstruction(id);
                                  }}
                                >
                                  <i className="icon mdi mdi-pencil" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Constructions;
