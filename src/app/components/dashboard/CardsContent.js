import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";

function CardsContent() {
  const [data, setData] = useState({});

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef
      .child(`/Produtos`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          setData({ ...snapshot.val() });
        } else {
          console.log("No data available");
          setData({});
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      setData({});
    };
  }, []);

  const QtInsert = () => {
    let qtInsert = 0;
    Object.keys(data)
      .reverse()
      .slice(0)
      .map((id) => {
        if (data[id].acao === "devolução") {
          qtInsert++;
        }
        return 0;
      });
    return qtInsert;
  };

  const QtRemove = () => {
    let qtremove = 0;
    Object.keys(data)
      .reverse()
      .slice(0)
      .map((id) => {
        if (data[id].acao === "retirada") {
          qtremove++;
        }
        return 0;
      });
    return qtremove;
  };

  return (
    <div className="row">
      <div className="col-sm-6 grid-margin">
        <div className="card">
          <div className="card-body">
            <h5>Devoluções de Produtos</h5>
            <div className="row">
              <div className="col-8 col-sm-12 col-xl-8 my-auto">
                <div className="d-flex d-sm-block d-md-flex align-items-center">
                  <h2 className="mb-0">{QtInsert()}</h2>
                </div>
                <h6 className="text-muted font-weight-normal">Total</h6>
              </div>
              <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                <i className="icon-lg mdi mdi-package-variant-closed text-success ml-auto"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6 grid-margin">
        <div className="card">
          <div className="card-body">
            <h5>Retiradas de Produtos</h5>
            <div className="row">
              <div className="col-8 col-sm-12 col-xl-8 my-auto">
                <div className="d-flex d-sm-block d-md-flex align-items-center">
                  <h2 className="mb-0">{QtRemove()}</h2>
                </div>
                <h6 className="text-muted font-weight-normal"> Total</h6>
              </div>
              <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                <i className="icon-lg mdi mdi-package-variant-closed text-danger ml-auto"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardsContent;
