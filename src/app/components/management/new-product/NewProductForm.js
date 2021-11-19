import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CSVReader from "react-csv-reader";
import firebase from "firebase/app";

import "./NewProductForm.css";
import { TextField } from "@mui/material";

export default function NewProductForm() {
  const { register, handleSubmit, reset } = useForm();
  const toastId = React.useRef(null);

  const [user, setUser] = useState(null);
  const [dataCsv, setDataCsv] = useState(null);

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

  const onSubmit = (data) => {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = date.getFullYear();
    const today = `${dd}/${mm}/${yyyy}`;
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hour = date.getHours();
    const time = `${hour}:${minutes}:${seconds}`;

    const productRef = firebase
      .database()
      .ref(`filiais/${user.id_filial}/estoque/produtos/`);
    const newProductRef = productRef.push();
    const productKey = newProductRef.key;
    newProductRef
      .set({
        cadastrado_por: user.nome,
        categoria: data.category.toLowerCase(),
        tipo: data.type.toLowerCase(),
        descricao: data.description,
        unidade_medida: data.unity,
        qt_inicial: parseFloat(data.amount),
        qt_atual: parseFloat(data.amount),
        data: today,
        hora: time,
      })
      .then(() => {
        notify();
        const storageRef = firebase.storage().ref();
        let index = 0;
        const dataFilesLenght = Array.from(data.files).length;

        Array.from(data.files).forEach((file) => {
          storageRef
            .child(
              `filiais/${user.id_filial}/produtos/${productKey}/${file.name}`
            )
            .put(file)
            .then(function (snapshot) {
              index = index + 1;

              if (index === dataFilesLenght) {
                toast.success(
                  `Todas os dados e fotos foram salvos com sucesso`,
                  {
                    theme: "dark",
                    hideProgressBar: true,
                    autoClose: 4000,
                  }
                );
                dismiss();
                reset();
              }
            })
            .catch(() => {
              console.log("upload fail");
            });
        });
      })
      .catch(() => {
        toast.error("Algo deu errado tente novamente", {
          theme: "dark",
        });
      });

    toast.clearWaitingQueue();
  };

  const handleImport = (data) => {
    setDataCsv(data);
  };

  const handleCsvSave = () => {
    var isValid = true;
    Object.keys(dataCsv).forEach((id) => {
      if (
        dataCsv[id].categoria === null ||
        dataCsv[id].categoria === undefined ||
        dataCsv[id].tipo === null ||
        dataCsv[id].tipo === undefined ||
        dataCsv[id].descricao === null ||
        dataCsv[id].descricao === undefined ||
        dataCsv[id].unidade_medida === null ||
        dataCsv[id].unidade_medida === undefined ||
        dataCsv[id].quantidade === null ||
        dataCsv[id].quantidade === undefined
      ) {
        isValid = false;
      }
    });
    if (isValid) {
      const date = new Date();
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = date.getFullYear();
      const today = `${dd}/${mm}/${yyyy}`;
      const seconds = date.getSeconds();
      const minutes = date.getMinutes();
      const hour = date.getHours();
      const time = `${hour}:${minutes}:${seconds}`;

      const productRef = firebase
        .database()
        .ref(`filiais/${user.id_filial}/estoque/produtos/`);

      Object.keys(dataCsv).forEach((id) => {
        const newProductRef = productRef.push();
        newProductRef
          .set({
            cadastrado_por: user.nome,
            categoria: dataCsv[id].categoria.toLowerCase(),
            tipo: dataCsv[id].tipo.toLowerCase(),
            descricao: dataCsv[id].descricao,
            unidade_medida: dataCsv[id].unidade_medida,
            qt_inicial: dataCsv[id].quantidade,
            qt_atual: dataCsv[id].quantidade,
            data: today,
            hora: time,
          })
          .then(() => {
            toast.success(`dados salvos ${id}/${dataCsv.length - 1}`, {
              theme: "dark",
              autoClose: 3000,
            });
          });
      });
    } else {
      toast.error(
        `CSV invalido, em seu arquivo, verifique se há campos nulos ou se os cabeçalhos estão iguais ao apresentado na tabela (incluindo letras minúsculas)`,
        {
          theme: "dark",
        }
      );
    }
  };

  const notify = () =>
    (toastId.current = toast.loading(`Salvando Dados Aguarde...`, {
      theme: "dark",
      autoClose: false,
    }));

  const dismiss = () => toast.dismiss(toastId.current);

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Produtos Nexsolar </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Cadastrar
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Novo Produto
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Novo Produto</h4>

              {user && (
                <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                    <TextField
                      style={{
                        width: "100%",
                        backgroundColor: "#30343c",
                        borderRadius: "5px",
                      }}
                      InputLabelProps={{
                        style: {
                          height: "100%",
                          color: "white",
                        },
                      }}
                      label="Categoria"
                      {...register("category")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <TextField
                      style={{
                        width: "100%",
                        backgroundColor: "#30343c",
                        borderRadius: "5px",
                      }}
                      InputLabelProps={{
                        style: {
                          height: "100%",
                          color: "white",
                        },
                      }}
                      label="Tipo"
                      {...register("type")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <TextField
                      style={{
                        width: "100%",
                        backgroundColor: "#30343c",
                        borderRadius: "5px",
                      }}
                      InputLabelProps={{
                        style: {
                          height: "100%",
                          color: "white",
                        },
                      }}
                      label="Decrição"
                      {...register("description")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <TextField
                      style={{
                        width: "100%",
                        backgroundColor: "#30343c",
                        borderRadius: "5px",
                      }}
                      InputLabelProps={{
                        style: {
                          height: "100%",
                          color: "white",
                        },
                      }}
                      label="Unidade de medida"
                      {...register("unity")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <TextField
                      style={{
                        width: "100%",
                        backgroundColor: "#30343c",
                        borderRadius: "5px",
                      }}
                      InputLabelProps={{
                        style: {
                          height: "100%",
                          color: "white",
                        },
                      }}
                      label="Quantidade"
                      {...register("amount")}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    style={{
                      textAlign: "center",
                      border: "1px solid white",
                    }}
                  >
                    <label
                      style={{
                        width: "100%",
                        display: "inline-block",
                        marginBottom: "0%",
                        cursor: "pointer",
                      }}
                    >
                      <i className="icon-md mdi mdi-image-multiple"> Fotos</i>
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
                  </Form.Group>

                  <div style={{ display: "flex" }}>
                    <button type="submit" className="btn btn-primary mr-2">
                      Salvar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      {user && (
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Importar Arquivo csv</h4>

                <Form.Group
                  style={{
                    textAlign: "center",
                    border: "1px solid white",
                  }}
                >
                  <label
                    style={{
                      width: "100%",
                      display: "inline-block",
                      marginBottom: "0%",
                      cursor: "pointer",
                    }}
                  >
                    <i className="icon-md mdi mdi-upload"> Importar</i>
                    <CSVReader
                      inputStyle={{ display: "none" }}
                      className="form-control"
                      onFileLoaded={handleImport}
                      parserOptions={{
                        header: true,
                        dynamicTyping: true,
                        skipEmptyLines: true,
                        transformHeader: (header) =>
                          header.toLowerCase().replace(/\W/g, ""),
                      }}
                    />
                  </label>
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
      )}
      {dataCsv && (
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> </th>
                        <th> categoria </th>
                        <th> tipo </th>
                        <th> descricao </th>
                        <th> unidade_medida </th>
                        <th> quantidade </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(dataCsv).map((id) => {
                        return (
                          <tr key={id}>
                            <td> {id} </td>
                            <td> {dataCsv[id].categoria} </td>
                            <td> {dataCsv[id].tipo} </td>
                            <td> {dataCsv[id].descricao} </td>
                            <td> {dataCsv[id].unidade_medida} </td>
                            <td> {dataCsv[id].quantidade} </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div style={{ display: "flex", marginTop: "10px" }}>
                  <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={() => {
                      handleCsvSave();
                    }}
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer limit={10} />
    </div>
  );
}
