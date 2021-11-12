import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";

function TableOutput() {
  const history = useHistory();
  const [actions, setActions] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);

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
    }

    return () => {
      isMounted = false;
    };
  }, [user, userID]);

  // useEffect(() => {
  // console.log(productsList);
  // console.log(data);
  // }, [actions, productsList]);

  const handleSeePhotos = (id) => {
    history.push(`/actions/return-photos/${id}`);
  };

  const handleReturnProduct = (id) => {
    history.push(`/actions/return-form/${id}`);
  };

  return (
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
                    <th> Quantidade retirada </th>
                    <th> Data </th>
                    <th> Hora </th>
                    <th> Obs </th>
                    <th> Fotos </th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(actions).map((id) => {
                    const productChosen = productsList[actions[id].id_prod];
                    if (productChosen) {
                      return (
                        <tr key={id}>
                          <td> {productChosen.categoria} </td>
                          <td> {actions[id].quantidade} </td>
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
                                className="badge badge-outline-success"
                                style={{ width: "100%" }}
                              >
                                Devolvido
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={id}>
                          <td> Erro </td>
                          <td> {actions[id].quantidade} </td>
                          <td> {actions[id].data} </td>
                          <td> {actions[id].hora}</td>
                          <td> {actions[id].obs}</td>
                          <td> Erro </td>
                        </tr>
                      );
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

export default TableOutput;
