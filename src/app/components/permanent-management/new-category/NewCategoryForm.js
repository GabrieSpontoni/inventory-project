import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";

import { TextField } from "@mui/material";

export default function NewCategoryForm() {
  const history = useHistory();
  const { register, handleSubmit, reset } = useForm();
  const toastId = React.useRef(null);

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [count, setCount] = useState(1);

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
                setUserId(snapshot.key);
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
    console.log(data);
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = date.getFullYear();
    const today = `${dd}/${mm}/${yyyy}`;
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hour = date.getHours();
    const time = `${hour}:${minutes}:${seconds}`;

    if (checkDuplicate(data.subcategory)) {
      toast.error("Identificadores repetidos favor corrigir", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }
    notify();

    const lowerCasedSubcategory = data.subcategory.map((name) =>
      name.toLowerCase()
    );

    const categoryRef = firebase
      .database()
      .ref(
        `filiais/${user.id_filial}/estoque/categorias_produtos_permanentes/`
      );
    const newCategory = categoryRef.push();
    const categoryKey = newCategory.key;
    newCategory
      .set({
        id_usuario: userId,
        categoria: data.category.toLowerCase(),
        data: today,
        hora: time,
      })
      .then((snapshot) => {
        const subcategoryRef = firebase
          .database()
          .ref(
            `filiais/${user.id_filial}/estoque/categorias_produtos_permanentes/${categoryKey}/subcategorias`
          );

        lowerCasedSubcategory.forEach((subcategory, index) => {
          const newSubcategory = subcategoryRef.push();
          newSubcategory
            .set({
              subcategoria: subcategory,
            })
            .then(() => {
              if (index === lowerCasedSubcategory.length - 1) {
                toast.success(`Categoria salva com sucesso`, {
                  theme: "dark",
                  hideProgressBar: false,
                  autoClose: 3000,
                  onClose: () => {
                    history.push("/permanent-management/category-list");
                  },
                });
                dismiss();
                reset();
              }
            })
            .catch((error) => {
              console.error(error);
              toast.error("Erro na subcategoria", {
                theme: "dark",
              });
            });
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro na categoria", {
          theme: "dark",
        });
      });
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

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Produtos Nexsolar </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Adm. permanente
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Nova Categoria
            </li>
          </ol>
        </nav>
      </div>

      <TextField
        style={{
          backgroundColor: "#30343c",
          borderRadius: "5px",
          width: "100%",
          marginBottom: "10px",
        }}
        type="number"
        defaultValue={1}
        label="Quantidade de subcategorias"
        InputLabelProps={{
          style: {
            height: "100%",
            color: "white",
          },
        }}
        sx={{ input: { color: "white" } }}
        required
        onChange={(event) => {
          setCount(event.target.value < 50 ? event.target.value : 50);
        }}
      />

      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Nova Categoria</h4>

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
                      sx={{ input: { color: "white" } }}
                      label="Categoria"
                      {...register("category")}
                      required
                    />
                  </Form.Group>

                  {Array.from({ length: count }).map((_, index) => (
                    <Form.Group key={index}>
                      <TextField
                        style={{
                          width: "60%",
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
                        label={`Subcategoria ${index + 1}`}
                        {...register(`subcategory[${index}]`)}
                        required
                      />
                    </Form.Group>
                  ))}

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

      <ToastContainer limit={10} />
    </div>
  );
}
