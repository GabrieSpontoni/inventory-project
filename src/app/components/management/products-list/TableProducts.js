import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";

function TableProducts() {
  const history = useHistory();
  const [data, setData] = useState({});
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
    if (user) {
      firebase
        .database()
        .ref(`/filiais/${user.id_filial}/estoque/produtos/`)
        .orderByChild("tipo")
        .once("value", (snapshot) => {
          if (isMounted) {
            const items = [];

            snapshot.forEach((childSnapshot) => {
              // console.log(childSnapshot.key);
              // console.log(childSnapshot.val());
              items[childSnapshot.key] = childSnapshot.val();
            });
            setData(items);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleSeePhotos = (id) => {
    history.push(`/management/products-list-photos/${id}`);
    console.log(id);
  };

  return (
    <div className="row ">
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
                    <th> Tipo </th>
                    <th> Quantidade inicial </th>
                    <th> Quantidade atual </th>
                    <th> Descrição </th>
                    <th> Hora do Cadastro </th>
                    <th> Data do Cadastro </th>
                    <th> Ações </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data)
                    .slice(0, 10)
                    .map((id) => {
                      return (
                        <tr key={id}>
                          <td>
                            {data[id].cadastrado_por
                              .split(" ")
                              .slice(0, 2)
                              .join(" ")}{" "}
                          </td>
                          <td> {data[id].categoria} </td>
                          <td> {data[id].tipo} </td>
                          <td> {data[id].qt_inicial}</td>
                          <td> {data[id].qt_atual}</td>
                          <td> {data[id].descricao}</td>
                          <td> {data[id].hora}</td>
                          <td> {data[id].data}</td>
                          <td>
                            <button
                              style={{ display: "flex" }}
                              type="button"
                              className="btn btn-primary btn-icon-text"
                              onClick={() => {
                                handleSeePhotos(id);
                              }}
                            >
                              <i className="icon mdi mdi-image-multiple" />
                              Fotos
                            </button>
                          </td>
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
  );
}

export default TableProducts;
