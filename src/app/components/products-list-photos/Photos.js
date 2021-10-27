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
    console.log(photoName);
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
  };

  return (
    <div>
      {photosUrl.length === 0 && isLoading && (
        <div>... Carregando Fotos - Aguarde</div>
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
                  <div className="card-footer">
                    <button
                      type="button"
                      className="btn btn-danger btn-icon-text"
                      style={{ marginRight: "10px" }}
                      onClick={() => {
                        handleDelete(photosName[e]);
                      }}
                    >
                      <i className="mdi mdi-delete btn-icon-prepend" />
                      Excluir
                    </button>
                    {photosName[e]}
                  </div>
                </div>
              </div>
            );
          })}

        {photosUrl.length === 0 && !isLoading && (
          <div>Sem fotos para este produto</div>
        )}
        <div
          style={{
            width: "100%",
            marginTop: "50px",
          }}
        >
          <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
            <label
              style={{
                width: "100%",
                display: "inline-block",
                marginBottom: "0%",
                cursor: "pointer",
                textAlign: "center",
                border: "1px solid white",
              }}
            >
              <i className="icon-md mdi mdi-image-multiple">Adicionar Fotos</i>
              <input
                style={{ cursor: "pointer" }}
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
                className="btn btn-primary mr-2"
                style={{
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                Confirmar
              </button>
              <ToastContainer limit={3} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
