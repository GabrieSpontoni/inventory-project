import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";

export function Photos() {
  const { idProd } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);

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
          if (isMounted) {
            res.items.forEach(function (folderRef) {
              folderRef.getDownloadURL().then(function (url) {
                setPhotos((arr) => [...arr, url]);
              });
            });
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
      <div className="row">
        {photos.length > 0 &&
          Object.keys(photos).map((e) => {
            return (
              <div key={e} className="col-sm-4 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <img src={photos[e]} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
