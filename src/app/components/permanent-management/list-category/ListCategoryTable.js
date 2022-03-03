import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";

function ListCategoryTable() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

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
                setUser(null);
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
      const dbRef = firebase.database().ref();
      let categorias = [];

      dbRef
        .child(
          `filiais/${user.id_filial}/estoque/categorias_produtos_permanentes`
        )
        .on("child_added", (snapshot) => {
          if (snapshot.exists()) {
            const categoria = snapshot.val();
            const id = snapshot.key;
            dbRef
              .child(`usuarios/${snapshot.val().id_usuario}`)
              .once("value", (snapshot) => {
                if (snapshot) {
                  const usuario = snapshot.val();

                  categorias.push({
                    id,
                    ...categoria,
                    usuario,
                  });
                }
              });
          }
        });

      setTimeout(() => {
        if (categorias.length > 0 && isMounted) {
          setData(categorias);
          setLoading(false);
        } else {
          if (isMounted) {
            setLoading(false);
          }
        }
      }, 1000);
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

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
                <h4 className="card-title">Obras</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Usuário </th>
                        <th> Categoria </th>
                        <th>Subcategorias</th>
                        <th> Hora do Cadastro </th>
                        <th> Data do Cadastro </th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 &&
                        data.map((_, index) => {
                          return (
                            <tr key={index}>
                              <td>{data[index].usuario.nome}</td>
                              <td> {data[index].categoria} </td>
                              <td>
                                {Object.entries(_.subcategorias).map(
                                  (value, key) => {
                                    return (
                                      <div key={key}>
                                        {value[1].subcategoria}
                                      </div>
                                    );
                                  }
                                )}
                              </td>
                              <td> {data[index].hora}</td>
                              <td> {data[index].data}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default ListCategoryTable;
