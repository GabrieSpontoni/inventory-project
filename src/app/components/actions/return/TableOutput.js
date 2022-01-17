import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import { CircularProgress } from "@mui/material";

function TableOutput() {
  const history = useHistory();
  const [actions, setActions] = useState(null);
  const [productsList, setProductsList] = useState(null);
  const [constructionsList, setConstructionsList] = useState(null);
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);

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
            snapshot.forEach((childSnapshot) => {
              if (
                childSnapshot.val().id_usuario === userID &&
                childSnapshot.val().tipo === "retirada"
              ) {
                items[childSnapshot.key] = childSnapshot.val();
              }
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
            });
            setActions(items);
          }
        })
        .catch((error) => {
          console.error(error);
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
  }, [user, userID]);

  useEffect(() => {
    let isMounted = true;
    if (actions && productsList && constructionsList && isMounted) {
      setLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [actions, productsList, constructionsList]);

  const handleSeePhotos = (id) => {
    history.push(`/actions/return-photos/${id}`);
  };

  const handleReturnProduct = (id) => {
    history.push(`/actions/return-form/${id}`);
  };

  return (
    <div>
      {loading && (
        <CircularProgress style={{ marginLeft: "50%", marginTop: "20%" }} />
      )}

      {!loading && Object.keys(actions).length === 0 && (
        <div>Você não possui nenhuma ação de retirada.</div>
      )}

      {!loading && Object.keys(actions).length > 0 && (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Devoluções </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="!#" onClick={(event) => event.preventDefault()}>
                    Ações
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Devoluções
                </li>
              </ol>
            </nav>
          </div>
          <div className="row ">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Minhas Retiradas</h4>

                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th> Produto </th>
                          <th> Obra </th>
                          <th> Qt retirada </th>
                          <th> Qt devolvida </th>
                          <th> Data </th>
                          <th> Hora </th>
                          <th> Obs </th>
                          <th> Fotos </th>
                          <th> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(actions).map((id) => {
                          return (
                            <tr key={id}>
                              <td>
                                {productsList[actions[id].id_prod] !== undefined
                                  ? productsList[actions[id].id_prod].categoria
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
                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-outline-warning btn-fw"
                                      style={{ width: "100%" }}
                                      onClick={() => {
                                        handleReturnProduct(id);
                                      }}
                                    >
                                      Devolver
                                    </button>
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
        </div>
      )}
    </div>
  );
}

export default TableOutput;
