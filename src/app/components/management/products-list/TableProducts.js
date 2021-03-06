import React, { useEffect, useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";

function TableProducts() {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState(null);
  const [show, setShow] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [productID, setProductID] = useState(null);
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
        .ref(`/filiais/${user.id_filial}/estoque/produtos/`)
        .orderByChild("tipo")
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

  const handleSeePhotos = (id) => {
    history.push(`/management/products-list-photos/${id}`);
  };

  const handleEditProduct = (id) => {
    history.push(`/management/products-list-edit/${id}`);
  };

  const handleDeleteProduct = () => {
    setShow(false);
    const storageRef = firebase.storage().ref();

    firebase
      .database()
      .ref(`/filiais/${user.id_filial}/estoque/produtos/${productID}`)
      .remove()
      .then(() => {
        toast.loading(`Excluindo dados`, {
          theme: "dark",
          position: "top-center",
        });
        storageRef
          .child(`filiais/${user.id_filial}/produtos/${productID}`)
          .listAll()
          .then(function (result) {
            if (result.items.length === 0) {
              window.location.reload();
            }
            let i = 1;
            result.items.forEach(function (itemRef) {
              storageRef
                .child(itemRef.fullPath)
                .delete()
                .then(function () {
                  if (i !== result.items.length) {
                    i = i + 1;
                  } else {
                    window.location.reload();
                  }
                });
            });
          });
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setDeleteProduct(data[id]);
    setProductID(id);
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
                <h4 className="card-title">Produtos</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Cadastrado por </th>
                        <th> Categoria </th>
                        <th> Quantidade inicial </th>
                        <th> Quantidade atual </th>
                        <th> Descri????o </th>
                        <th> Observa????o </th>
                        <th> Produto permanente</th>

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
                              <td> {data[id].categoria} </td>
                              <td> {data[id].qt_inicial}</td>
                              <td> {data[id].qt_atual}</td>
                              <td> {data[id].descricao}</td>
                              <td> {data[id].obs}</td>
                              <td>
                                {" "}
                                {data[id].identificacao_unica ? "sim" : "nao"}
                              </td>
                              <td> {data[id].hora}</td>
                              <td> {data[id].data}</td>
                              <td style={{ display: "flex" }}>
                                <button
                                  style={{ display: "flex" }}
                                  type="button"
                                  className="btn btn-primary btn-icon-text"
                                  onClick={() => {
                                    handleSeePhotos(id);
                                  }}
                                >
                                  <i className="icon mdi mdi-image-multiple" />
                                </button>
                                <button
                                  style={{ display: "flex" }}
                                  type="button"
                                  className="btn btn-warning btn-icon-text"
                                  onClick={() => {
                                    handleEditProduct(id);
                                  }}
                                >
                                  <i className="icon mdi mdi-pencil" />
                                </button>
                                <button
                                  style={{ display: "flex" }}
                                  type="button"
                                  className="btn btn-danger btn-icon-text"
                                  onClick={() => {
                                    handleShow(id);
                                  }}
                                >
                                  <i className="icon mdi mdi mdi-delete" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>

                  {deleteProduct && (
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Body>
                        <Alert variant="danger">
                          <Alert.Heading>TEM CERTEZA?</Alert.Heading>
                          <p>
                            Ao excluir este produto a opera????o n??o poder?? ser
                            desfeita. Produto: {deleteProduct.categoria}
                          </p>
                          <hr />
                        </Alert>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                          Cancelar
                        </Button>
                        <Button
                          variant="success"
                          onClick={() => {
                            handleDeleteProduct();
                          }}
                        >
                          Confirmar
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  )}
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default TableProducts;
