import React from "react";
import { Line } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import moment from "moment/moment";
const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimeStamp = [];
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimeStamp.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimeStamp.reverse(),
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <Row className="chart-header">
        <Typography level={2} className="chart-title">
          {coinName} Price Chart
        </Typography>
        <Col className="price-container">
          <Typography level={5} className="price-change">
            {coinHistory?.data?.change > 0 ? (
              <p style={{ color: "green", marginBottom: "0" }}>
                {coinHistory?.data?.change}%
              </p>
            ) : (
              <p style={{ color: "red", marginBottom: "0" }}>
                {coinHistory?.data?.change}%
              </p>
            )}
          </Typography>
          <Typography level={5} className="current-price">
            Current {coinName} Price: ${currentPrice}
          </Typography>
        </Col>
      </Row>
      <Line data={data} options={options}></Line>
    </>
  );
};

export default LineChart;
