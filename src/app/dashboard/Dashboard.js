import React, { Component } from "react";
import "../../firebase/config";
import TableDashboard from "../components/dashboard/TableDashboard";
import CardsContent from "../components/dashboard/CardsContent";

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
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <strong>Dashboard </strong>
            <small> versão 1.0</small>
          </h3>
        </div>

        {/* <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body py-0 px-0 px-sm-3">
                <div className="row align-items-center">
                  <div className="col-4 col-sm-3 col-xl-2">
                    <i className="icon-lg mdi mdi-white-balance-sunny text-warning ml-auto" />
                  </div>
                  <div className="col-5 col-sm-7 col-xl-8 p-0">
                    <h4 className="mb-1 mb-sm-0">
                      Gerenciamento de inventário
                    </h4>
                    <p className="mb-0 font-weight-normal d-none d-sm-block">
                      Esta é uma aplicação para o controle de saídas e entradas
                      de produtos do estoque da Nexsolar, feita em ReactJS com o
                      foco na melhor experiência de usuário com as melhores
                      tecnologias. Aproveite!
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
        </div> */}

        <CardsContent />

        <TableDashboard />
      </div>
    );
  }
}

export default Dashboard;
