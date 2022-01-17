import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button, Alert } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";

import "./Photos.css";

export function Photos() {
  const { idAction } = useParams();
  const { register, handleSubmit } = useForm();
  const [photosName, setPhotosName] = useState([]);
  const [photosUrl, setPhotosUrl] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

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
                // console.log(snapshot.val());
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
    var storage = firebase.storage();
    if (user) {
      var pathReference = storage.ref(
        `/filiais/${user.id_filial}/acoes/${idAction}/`
      );
      console.log();
      pathReference
        .listAll()
        .then(function (res) {
          if (res.items.length === 0) {
            setIsLoading(false);
          }
          if (isMounted) {
            const photosList = [];
            res.items.forEach(function (folderRef, i) {
              photosList.push(res.items[i].name);
              folderRef.getDownloadURL().then(function (url) {
                setPhotosUrl((arr) => [...arr, url]);
              });
            });
            setPhotosName(photosList);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [idAction, user]);

  const onSubmit = (data) => {
    const storageRef = firebase.storage().ref();

    for (let i = 0; i < data.files.length; i++) {
      storageRef
        .child(
          `filiais/${user.id_filial}/produtos/${idAction}/${data.files[i].name}`
        )
        .put(data.files[i])
        .then(function (snapshot) {
          toast.success(`${data.files[i].name} upload OK`, {
            theme: "dark",
            position: "top-center",
          });
        })
        .catch(() => {
          console.log("upload fail");
        });
    }
  };

  const handleDelete = (photoName) => {
    const storageRef = firebase.storage().ref();
    storageRef
      .child(`filiais/${user.id_filial}/produtos/${idAction}/${photoName}`)
      .delete()
      .then(function () {
        console.log("delete ok");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
  };

  return (
    <div>
      {photosUrl.length === 0 && isLoading && <div>Carregando...</div>}
      {photosUrl.length === 0 && !isLoading && (
        <div>Este produto não possui fotos</div>
      )}
      <div className="row">
        {photosUrl.length > 0 &&
          Object.keys(photosUrl).map((e) => {
            return (
              <div key={e}>
                <div
                  className="card"
                  style={{
                    height: "400px",
                    width: "300px",
                    marginRight: "50px",
                    marginTop: "50px",
                    display: "flex",
                  }}
                >
                  <div className="card-body">
                    <img
                      src={photosUrl[e]}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "8px",
                      }}
                    />
                  </div>

                  <div
                    className="card-footer"
                    style={{ display: "inline-block" }}
                  >
                    {photosName[e]}

                    <div>
                      <button
                        type="button"
                        className="btn btn-danger btn-icon-text"
                        style={{
                          marginBottom: "10px",
                          marginLeft: "60%",
                        }}
                        onClick={() => {
                          handleShow();
                        }}
                      >
                        <i className="mdi mdi-delete btn-icon-prepend" />
                        Excluir
                      </button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Body>
                          <Alert variant="danger">
                            <Alert.Heading>TEM CERTEZA?</Alert.Heading>
                            <p>
                              Ao excluir a foto deste produto a operação não
                              poderá ser desfeita.
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
                              handleDelete(photosName[e]);
                            }}
                          >
                            Confirmar
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        <div
          className="card"
          style={{
            height: "400px",
            width: "300px",
            marginRight: "50px",
            marginTop: "50px",
            display: "flex",
          }}
        >
          <div className="card-body">
            <div>
              <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
                <label>
                  <i
                    className="icon-lg mdi mdi-image-multiple text-primary"
                    style={{
                      marginLeft: "90px",
                      marginTop: "90px",
                      display: "flex",
                      cursor: "pointer",
                    }}
                  />
                  <input
                    style={{
                      cursor: "pointer",
                      background: "transparent",
                      border: "none",
                    }}
                    id="myInput"
                    type="file"
                    accept="image/*"
                    multiple
                    className="form-control"
                    required
                    {...register("files")}
                  />
                </label>
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-icon-text"
                    style={{ width: "100%", marginTop: "100px" }}
                  >
                    Adicionar Fotos(s)
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
