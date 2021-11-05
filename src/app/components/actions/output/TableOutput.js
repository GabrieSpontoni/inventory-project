import React, { useEffect } from "react";
import firebase from "firebase/app";

function TableOutput() {
  // const [data, setData] = useState({});
  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef
      .child(`/Produtos`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          // setData({ ...snapshot.val() });
        } else {
          // console.log("No data available");
          // setData({});
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      // setData({});
    };
  }, []);

  // const colorBadge = (action) => {
  //   if (action === "devolução") return "success";
  //   else return "danger";
  // };

  return (
    <div className="row ">
      {/* <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Suas últimas ações</h4>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th> Nome do Funcionário </th>
                    <th> Produto </th>
                    <th> Quantidade </th>
                    <th> Data </th>
                    <th> Hora </th>
                    <th> Obs </th>
                    <th> Ação </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data)
                    .reverse()
                    .slice(0, 10)
                    .map((id) => {
                      return (
                        <tr key={id}>
                          <td> {data[id].nome} </td>
                          <td> {data[id].produto} </td>
                          <td> {data[id].quantidade} </td>
                          <td> {data[id].data} </td>
                          <td> {data[id].hora}</td>
                          <td> {data[id].obs}</td>
                          <td>
                            <div
                              className={`badge badge-${colorBadge(
                                data[id].acao
                              )}`}
                            >
                              {data[id].acao}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default TableOutput;
