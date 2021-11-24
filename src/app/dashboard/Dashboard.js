import React, { Component } from "react";
import "../../firebase/config";
import TableDashboard from "../components/dashboard/TableDashboard";

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

        <TableDashboard />
      </div>
    );
  }
}

export default Dashboard;
