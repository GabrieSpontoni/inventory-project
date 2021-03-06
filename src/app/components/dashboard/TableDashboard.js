import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import { CircularProgress } from "@mui/material";

function TableDashboard() {
  const history = useHistory();
  const [actions, setActions] = useState(null);
  const [productsList, setProductsList] = useState(null);
  const [usersList, setUsersList] = useState(null);
  const [constructionsList, setConstructionsList] = useState(null);
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countPending, setCountPending] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const dbRef = firebase.database().ref();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
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
        .ref()
        .child(`/filiais/${user.id_filial}/estoque/acoes/`)
        .get()
        .then((snapshot) => {
          if (isMounted) {
            const items = [];
            let countPending = 0;
            snapshot.forEach((childSnapshot) => {
              if (childSnapshot.val().tipo === "retirada") {
                items[childSnapshot.key] = childSnapshot.val();
                if (childSnapshot.val().status === "pendente") {
                  countPending += 1;
                }
              }
            });
            setActions(items);
            setCountPending(countPending);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      firebase
        .database()
        .ref()
        .child(`/filiais/${user.id_filial}/estoque/produtos/`)
        .get()
        .then((snapshot) => {
          if (isMounted) {
            const products = [];
            snapshot.forEach((childSnap) => {
              products[childSnap.key] = childSnap.val();
            });
            setProductsList(products);
          }
        });

      firebase
        .database()
        .ref()
        .child(`/usuarios`)
        .get()
        .then((snapshot) => {
          if (isMounted) {
            const users = [];
            snapshot.forEach((childSnap) => {
              users[childSnap.key] = childSnap.val();
            });
            setUsersList(users);
          }
        });

      firebase
        .database()
        .ref()
        .child(`/filiais/${user.id_filial}/obras/`)
        .get()
        .then((snapshot) => {
          if (isMounted) {
            const constructions = [];
            snapshot.forEach((childSnap) => {
              constructions[childSnap.key] = childSnap.val();
            });
            setConstructionsList(constructions);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [user, userID, countPending]);

  useEffect(() => {
    if (actions && productsList && usersList && constructionsList) {
      setLoading(false);
    }
  }, [actions, productsList, usersList, constructionsList]);

  const handleSeePhotos = (id) => {
    history.push(`/dashboard/dashboard-photos/${id}`);
  };

  return (
    <div>
      {loading && (
        <CircularProgress style={{ marginLeft: "50%", marginTop: "20%" }} />
      )}

      {!loading && (
        <div className="row ">
          <div className="col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Retiradas Pendentes</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">{countPending}</h2>
                    </div>
                    <h6 className="text-muted font-weight-normal"> Total</h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-package-variant-closed text-danger ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Ultimas A????es</h4>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Usu??rio</th>
                        <th> Produto </th>
                        <th> Obra </th>
                        <th> Qt retirada </th>
                        <th> Qt devolvida </th>
                        <th> Data </th>
                        <th> Hora </th>
                        <th> Obs </th>
                        <th> Fotos </th>
                        <th> Status </th>
                      </tr>
                    </thead>
                    <tbody>
                      {actions &&
                        productsList &&
                        usersList &&
                        constructionsList &&
                        Object.keys(actions)
                          .reverse()
                          .map((id) => {
                            return (
                              <tr key={id}>
                                <td>
                                  {usersList[actions[id].id_usuario] !==
                                  undefined
                                    ? usersList[actions[id].id_usuario].nome
                                    : actions[id].id_usuario}
                                </td>
                                <td>
                                  {productsList[actions[id].id_prod] !==
                                  undefined
                                    ? productsList[actions[id].id_prod]
                                        .descricao
                                    : actions[id].id_prod}
                                </td>
                                <td>
                                  {constructionsList[actions[id].id_obra] !==
                                  undefined
                                    ? constructionsList[actions[id].id_obra]
                                        .nome_obra
                                    : actions[id].id_obra}
                                </td>
                                <td> {actions[id].quantidade_retirada} </td>
                                <td> {actions[id].quantidade_devolvida} </td>
                                <td> {actions[id].data} </td>
                                <td> {actions[id].hora}</td>
                                <td> {actions[id].obs}</td>
                                <td>
                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-icon-text"
                                      onClick={() => handleSeePhotos(id)}
                                    >
                                      <i className="icon mdi mdi-image-multiple" />
                                    </button>
                                  </div>
                                </td>
                                {actions[id].status === "pendente" && (
                                  <td>
                                    <div
                                      className="btn btn-outline-warning btn-fw"
                                      style={{
                                        width: "100%",
                                        cursor: "default",
                                      }}
                                    >
                                      Devolver
                                    </div>
                                  </td>
                                )}
                                {actions[id].status === "devolvido" && (
                                  <td>
                                    <div
                                      className="btn btn-outline-success btn-fw"
                                      style={{
                                        width: "100%",
                                        cursor: "default",
                                      }}
                                    >
                                      Devolvido
                                    </div>
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableDashboard;
