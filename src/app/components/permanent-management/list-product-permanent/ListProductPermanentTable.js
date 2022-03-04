import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";
import { DataGrid } from "@mui/x-data-grid";

function ListProductPermanentTable() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [rows, setRows] = useState(null);

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
      const products = [];

      dbRef
        .child(`filiais/${user.id_filial}/estoque/produtos_permanentes`)
        .on("child_added", (snapshot) => {
          if (snapshot.exists()) {
            const promise_user = dbRef
              .child(`usuarios/${snapshot.val().id_usuario}`)
              .once("value");

            const promise_category = dbRef
              .child(
                `filiais/${
                  user.id_filial
                }/estoque/categorias_produtos_permanentes/${
                  snapshot.val().categoria_id
                }`
              )
              .once("value");

            Promise.all([promise_user, promise_category]).then((resp) => {
              products.push({
                ...snapshot.val(),
                usuario: resp[0].val(),
                categoria: resp[1].val(),
              });
            });
          }
        });

      setTimeout(() => {
        if (products.length > 0 && isMounted) {
          setData(products);
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

  useEffect(() => {
    if (data && data.length > 0) {
      const rawData = [];
      data.forEach((product, index) => {
        console.log(product);
        rawData.push({
          id: index,
          userName: product.usuario.nome,
          item: product.item,
          category: product.categoria.categoria,
        });
      });
      setRows(rawData);
    }
  }, [data]);

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
                <h4 className="card-title">Produtos Permanentes</h4>

                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    sx={{
                      height: "100%",
                      width: "100%",
                      color: "white",
                      "& .css-levciy-MuiTablePagination-displayedRows ": {
                        color: "white",
                      },
                      "& .css-i4bv87-MuiSvgIcon-root": {
                        color: "white",
                      },
                    }}
                    rows={rows}
                    columns={[
                      {
                        field: "userName",
                        headerName: "Usuario",

                        flex: 1,
                      },
                      {
                        field: "item",
                        headerName: "Item",

                        flex: 1,
                      },
                      {
                        field: "category",
                        headerName: "Categoria",

                        flex: 1,
                      },
                    ]}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </div>
                {/* <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Usuário </th>
                        <th> Categoria </th>
                        <th>Subcategoria</th>
                        <th>Nexcodigos</th>
                        <th>Numeros de serie</th>
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
                              <td> {data[index].categoria.categoria} </td>
                              <td>
                                {Object.entries(
                                  data[index].categoria.subcategorias
                                ).map((value, key) => {
                                  return value[0] !==
                                    data[index].subcategoria_id ? (
                                    <div key={key} />
                                  ) : (
                                    <div key={key}>{value[1].subcategoria}</div>
                                  );
                                })}
                              </td>
                              <td>
                                {Object.entries(
                                  data[index].identificadores
                                ).map((value, key) => {
                                  console.log(value);
                                  return (
                                    <div key={key}>
                                      {value[1].nexsolar_code}
                                    </div>
                                  );
                                })}
                              </td>
                              <td>
                                {Object.entries(
                                  data[index].identificadores
                                ).map((value, key) => {
                                  console.log(value);
                                  return (
                                    <div key={key}>
                                      {value[1].serial_number}
                                    </div>
                                  );
                                })}
                              </td>
                              <td> {data[index].hora}</td>
                              <td> {data[index].data}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div> */}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default ListProductPermanentTable;
