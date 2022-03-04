import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";

import "./NewProductPermanentForm.css";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";

export default function NewProductForm() {
  const { register, handleSubmit, reset } = useForm();
  const toastId = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [categories, setCategories] = useState(null);
  const [subcategories, setSubcategories] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [amountUniqueIds, setAmountUniqueIds] = useState(1);

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
                setUserID(snapshot.key);
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
    const categoriesLabels = [];
    if (user) {
      const dbRef = firebase.database().ref();
      const categoriesRef = dbRef.child(
        `filiais/${user.id_filial}/estoque/categorias_produtos_permanentes/`
      );
      categoriesRef.on("value", (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            categoriesLabels.push({
              label: childSnapshot.val().categoria,
              id: childSnapshot.key,
              subcategories: childSnapshot.val().subcategorias,
            });
          });
        }
      });
    }
    setTimeout(() => {
      setCategories(categoriesLabels);
      setIsLoading(false);
    }, 1000);
  }, [user]);

  const onSubmit = (data) => {
    notify();

    data.category = currentCategory;
    data.subcategory = currentSubcategory;
    data.nexsolarCode.length = data.serialNumber.length = amountUniqueIds;

    if (isNaN(parseFloat(data.price))) {
      dismiss();
      toast.error("Valor inválido", {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      });
      return;
    }

    if (checkDuplicate(data.nexsolarCode)) {
      dismiss();
      toast.error("Nexcódigos duplicados", {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      });
      return;
    }

    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = date.getFullYear();
    const today = `${dd}/${mm}/${yyyy}`;
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hour = date.getHours();
    const time = `${hour}:${minutes}:${seconds}`;

    const dbRef = firebase.database().ref();
    const permanentProductsRef = dbRef.child(
      `filiais/${user.id_filial}/estoque/produtos_permanentes/`
    );
    permanentProductsRef
      .push({
        data: today,
        hora: time,
        id_usuario: userID,
        item: data.item,
        categoria_id: data.category.id,
        subcategoria_id: data.subcategory.id,
        quantidade: parseInt(data.amount),
        valor: parseFloat(data.price),
        local_compra: data.local,
        nf: data.nf,
      })
      .then((snapshot) => {
        const idsRef = dbRef.child(
          `filiais/${user.id_filial}/estoque/produtos_permanentes/${snapshot.key}/identificadores`
        );
        for (let i = 0; i < amountUniqueIds; i++) {
          idsRef.push({
            serial_number: data.serialNumber[i],
            nexsolar_code: data.nexsolarCode[i],
          });
        }

        const storageRef = firebase.storage().ref();
        let index = 0;
        let dataFilesLenght = Array.from(data.files).length;
        Array.from(data.files).forEach((file) => {
          storageRef
            .child(
              `filiais/${user.id_filial}/produtos_permanentes/${snapshot.key}/${file.name}`
            )
            .put(file)
            .then(function (snapshot) {
              index = index + 1;

              if (index === dataFilesLenght) {
                dismiss();

                toast.success(`Dados salvos com sucesso`, {
                  theme: "dark",
                  hideProgressBar: false,
                  autoClose: 2000,
                });
                reset();
              }
            })
            .catch(() => {
              console.log("upload fail");
              toast.error(`Erro ao salvar arquivo`);
              dismiss();
            });
        });
      });

    toast.clearWaitingQueue();
  };

  function checkDuplicate(arr) {
    let result = false;
    const s = new Set(arr);
    if (arr.length !== s.size) {
      result = true;
    }
    return result;
  }

  const notify = () =>
    (toastId.current = toast.loading(`Salvando Dados Aguarde...`, {
      theme: "dark",
      autoClose: false,
    }));

  const dismiss = () => toast.dismiss(toastId.current);

  const handleGetSubcategories = (value) => {
    setCurrentCategory(value);
    const subcategoriesLabels = [];
    if (value) {
      Object.keys(value.subcategories).forEach((key) => {
        subcategoriesLabels.push({
          label: value.subcategories[key].subcategoria,
          id: key,
        });
      });
    }

    setSubcategories(subcategoriesLabels);
  };

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
              Novo Produto Permanente
            </li>
          </ol>
        </nav>
      </div>

      {isLoading && (
        <CircularProgress style={{ marginLeft: "50%", marginTop: "20%" }} />
      )}
      {!isLoading && (
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Novo Produto Permanente</h4>

                {user && (
                  <form
                    className="form-sample"
                    onSubmit={handleSubmit(onSubmit)}
                  >
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
                        sx={{ input: { color: "white" } }}
                        label="Item"
                        {...register("item")}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Autocomplete
                        style={{
                          backgroundColor: "#30343c",
                          borderRadius: "5px",
                        }}
                        disablePortal
                        id="combo-box-demo"
                        options={categories}
                        onChange={(event, value) => {
                          handleGetSubcategories(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Categoria"
                            InputLabelProps={{
                              style: {
                                height: "100%",
                                color: "white",
                              },
                            }}
                            sx={{ input: { color: "white" } }}
                            required
                          />
                        )}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Autocomplete
                        style={{
                          backgroundColor: "#30343c",
                          borderRadius: "5px",
                        }}
                        disablePortal
                        id="combo-box-demo"
                        options={subcategories || []}
                        onChange={(event, value) => {
                          setCurrentSubcategory(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Subcategoria"
                            InputLabelProps={{
                              style: {
                                height: "100%",
                                color: "white",
                              },
                            }}
                            sx={{ input: { color: "white" } }}
                            required
                          />
                        )}
                      />
                    </Form.Group>
                    <Form.Group>
                      <TextField
                        type="number"
                        value={amountUniqueIds}
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
                        sx={{ input: { color: "white" } }}
                        label="Quantidade"
                        {...register("amount")}
                        onChange={(event) => {
                          event.target.value < 1
                            ? setAmountUniqueIds(1)
                            : setAmountUniqueIds(event.target.value);
                        }}
                        required
                      />
                    </Form.Group>

                    {Array.from({ length: amountUniqueIds }).map((_, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
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
                              sx={{ input: { color: "white" } }}
                              label={`Código Nexsolar ${index + 1}`}
                              {...register(`nexsolarCode[${index}]`)}
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
                              sx={{ input: { color: "white" } }}
                              label={`Numero de Série ${index + 1}`}
                              {...register(`serialNumber[${index}]`)}
                            />
                          </Form.Group>
                        </div>
                      );
                    })}

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
                        inputProps={{
                          maxLength: 13,
                          step: "1",
                        }}
                        sx={{ input: { color: "white" } }}
                        label="Valor (R$ 9999.99)"
                        {...register("price")}
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
                        sx={{ input: { color: "white" } }}
                        label="Local da Compra"
                        {...register("local")}
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
                        sx={{ input: { color: "white" } }}
                        label="Numero da Nota Fiscal"
                        {...register("nf")}
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
      )}
      <ToastContainer limit={10} />
    </div>
  );
}
