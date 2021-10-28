import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";

import "./Photos.css";

export function Photos() {
  const { idProd } = useParams();
  const { register, handleSubmit } = useForm();
  const [photosName, setPhotosName] = useState([]);
  const [photosUrl, setPhotosUrl] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        `/filiais/${user.id_filial}/produtos/${idProd}/`
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
  }, [idProd, user]);

  const onSubmit = (data) => {
    console.log(data);
    const storageRef = firebase.storage().ref();

    for (let i = 0; i < data.files.length; i++) {
      storageRef
        .child(
          `filiais/${user.id_filial}/produtos/${idProd}/${data.files[i].name}`
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
  // useEffect(() => {
  //   console.log(photosName);
  // });
  const handleDelete = (photoName) => {
    // console.log(photoName);

    if (window.confirm(`Deseja realmente excluir a foto ${photoName}?`)) {
      const storageRef = firebase.storage().ref();
      storageRef
        .child(`filiais/${user.id_filial}/produtos/${idProd}/${photoName}`)
        .delete()
        .then(function () {
          console.log("delete ok");
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
                  {user.ti}
                  <div className="card-footer">
                    {user && user.tipo_atual === "administrador" && (
                      <button
                        type="button"
                        className="btn btn-danger btn-icon-text"
                        style={{ marginRight: "10px", marginBottom: "10px" }}
                        onClick={() => {
                          handleDelete(photosName[e]);
                        }}
                      >
                        <i className="mdi mdi-delete btn-icon-prepend" />
                        Excluir
                      </button>
                    )}
                    {photosName[e]}
                  </div>
                </div>
              </div>
            );
          })}
        {user && user.tipo_atual === "administrador" && (
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
        )}
      </div>
    </div>
  );
}