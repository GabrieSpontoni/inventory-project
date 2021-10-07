import "../firebase/config";
import { getDatabase, ref, push, set } from "firebase/database";

const database = getDatabase();
export const dbRef = ref(getDatabase());

export const setProduct = () => {
  set(ref(database, "Produtos/"), {
    produto: "Fio",
    quantidade: 20,
    Data: "Utilitário",
  });
};

export const pushProduct = () => {
  var date = new Date();
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = date.getFullYear();
  var today = `${dd}/${mm}/${yyyy}`;

  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hour = date.getHours();

  var time = `${hour}:${minutes}:${seconds}`;
  push(ref(database, "Produtos/"), {
    nome: "Gabriel Spontoni",
    produto: "Fio",
    quantidade: 20,
    data: today,
    hora: time,
    acao: "retirada",
  });
};

// export const getAll = async () => {
//   get(child(dbRef, `/Produtos`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//       } else {
//         console.log("No data available");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
