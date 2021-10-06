import React, { Component } from "react";
import "../../firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";

const database = getDatabase();
const dbRef = ref(getDatabase());

export class Dashboard extends Component {
  transactionHistoryData = {
    labels: ["Paypal", "Stripe", "Cash"],
    datasets: [
      {
        data: [55, 25, 20],
        backgroundColor: ["#111111", "#00d25b", "#ffab00"],
      },
    ],
  };

  transactionHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
  };

  sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  toggleProBanner() {
    document.querySelector(".proBanner").classList.toggle("hide");
  }

  render() {
    function handleClick() {
      console.log(ref(database));
      // set(ref(database, "Produtos/"), {
      //   codigo: 3,
      //   nome: "Fio",
      //   quantidade: 20,
      //   tipo: "Utilitário",
      // });

      get(child(dbRef, `/Produtos`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return (
      <div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body py-0 px-0 px-sm-3">
                <div className="row align-items-center">
                  <div className="col-4 col-sm-3 col-xl-2">
                    <img
                      src={require("../../assets/images/dashboard/Group126@2x.png")}
                      className="gradient-corona-img img-fluid"
                      alt="banner"
                    />
                  </div>
                  <div className="col-5 col-sm-7 col-xl-8 p-0">
                    <h4 className="mb-1 mb-sm-0">Inventory management</h4>
                    <p className="mb-0 font-weight-normal d-none d-sm-block">
                      Nexsolar's inventory management model made in reactJS for
                      user-experienced readability and aesthetics!
                    </p>
                  </div>
                  <div className="col-3 col-sm-2 col-xl-2 pl-0 text-center">
                    <button
                      className="btn btn-outline-light btn-rounded get-started-btn"
                      onClick={handleClick}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Returns</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">30 Products</h2>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      11.38% Since last month
                    </h6>
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
                <h5>Withdrawn</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">20 Products</h2>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      {" "}
                      9.61% Since last month
                    </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-package-variant-closed text-danger ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Last Actions</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        {/* <th>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </th> */}
                        <th> Employe Name </th>
                        <th> Product </th>
                        <th> Amount </th>
                        <th> Date </th>
                        <th> Hour </th>
                        <th> Product Photo </th>
                        <th> Payment Status </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td> */}
                        <td>
                          <div className="d-flex">
                            <img
                              src={require("../../assets/images/faces/face1.jpg")}
                              alt="face"
                            />
                            <span className="pl-2">Henry Klein</span>
                          </div>
                        </td>
                        <td> hammer </td>
                        <td> 2 </td>
                        <td> 04 Dec 2019 </td>
                        <td> 13:45:59 </td>
                        <td>
                          <div className="d-flex">
                            <img
                              src={require("../../assets/images/product_images_2/hammer.jpg")}
                              alt="product"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="badge badge-outline-success">
                            Devolution
                          </div>
                        </td>
                      </tr>
                      <tr>
                        {/* <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td> */}
                        <td>
                          <div className="d-flex">
                            <img
                              src={require("../../assets/images/faces/face2.jpg")}
                              alt="face"
                            />
                            <span className="pl-2">Estella Bryan</span>
                          </div>
                        </td>
                        <td> hammer </td>
                        {/* <td> $14,500 </td> */}
                        <td> 2 </td>
                        <td> 04 Dec 2019 </td>
                        <td> 13:45:59 </td>
                        <td>
                          <div className="d-flex">
                            <img
                              src={require("../../assets/images/product_images_2/hammer.jpg")}
                              alt="product"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="badge badge-outline-danger">Exit</div>
                        </td>
                      </tr>
                      <tr>
                        {/* <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td> */}
                        <td>
                          <div className="d-flex">
                            <img
                              src={require("../../assets/images/faces/face5.jpg")}
                              alt="face"
                            />
                            <span className="pl-2">Lucy Abbott</span>
                          </div>
                        </td>
                        <td> hammer </td>
                        {/* <td> $14,500 </td> */}
                        <td> 2 </td>
                        <td> 04 Dec 2019 </td>
                        <td> 13:45:59 </td>
                        <td>
                          <div className="d-flex">
                            <img
                              src={require("../../assets/images/product_images_2/hammer.jpg")}
                              alt="product"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="badge badge-outline-success">
                            Devolution
                          </div>
                        </td>
                      </tr>
                      <tr>
                        {/* <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td> */}
                        <td>
                          <div className="d-flex">
                            <img
                              src={require("../../assets/images/faces/face3.jpg")}
                              alt="face"
                            />
                            <span className="pl-2">Peter Gill</span>
                          </div>
                        </td>
                        <td> hammer </td>
                        {/* <td> $14,500 </td> */}
                        <td> 2 </td>
                        <td> 04 Dec 2019 </td>
                        <td> 13:45:59 </td>
                        <td>
                          <div className="d-flex">
                            <img
                              src={require("../../assets/images/product_images_2/hammer.jpg")}
                              alt="product"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="badge badge-outline-success">
                            Devolution
                          </div>
                        </td>
                      </tr>
                      <tr>
                        {/* <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td> */}
                        <td>
                          <div className="d-flex">
                            <img
                              src={require("../../assets/images/faces/face4.jpg")}
                              alt="face"
                            />
                            <span className="pl-2">Sallie Reyes</span>
                          </div>
                        </td>
                        <td> hammer </td>
                        {/* <td> $14,500 </td> */}
                        <td> 2 </td>
                        <td> 04 Dec 2019 </td>
                        <td> 13:45:59 </td>
                        <td>
                          <div className="d-flex">
                            <img
                              src={require("../../assets/images/product_images_2/hammer.jpg")}
                              alt="product"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="badge badge-outline-danger">Exit</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
