import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";

import "./Photos.css";

export function Photos() {
  const { idProd } = useParams();
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
        `/filiais/${user.id_filial}/acoes/${idProd}/`
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

  return (
    <div>
      {photosUrl.length === 0 && isLoading && <CircularProgress />}
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
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
