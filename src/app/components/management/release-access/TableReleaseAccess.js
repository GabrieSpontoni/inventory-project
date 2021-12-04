import React, { useEffect } from "react";

import { TableEmploye } from "./componentsTableReleaseAccess/TableEmploye";
import { TableAdm } from "./componentsTableReleaseAccess/TableAdm";

import firebase from "firebase/app";

function TableManagement() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const dbRef = firebase.database().ref();
    let isMounted = true;
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

  return (
    <div>
      {user &&
        (user.tipo_atual === "administrador" ||
          user.tipo_atual === "diretor") && <TableEmploye />}
      {user && user.tipo_atual === "diretor" && <TableAdm />}
    </div>
  );
}

export default TableManagement;
