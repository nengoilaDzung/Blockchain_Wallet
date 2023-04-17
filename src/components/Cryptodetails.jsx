import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { Chart as ChartJS } from "chart.js/auto";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptosQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoAPI";
import LineChart from "./LineChart";
import Loader from "./Loader";

const Cryptodetails = () => {
  const { coinId } = useParams();

  const [timePeriod, setTimePeriod] = useState("24h");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  console.log(coinHistory);
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const cryptoDetails = data?.data?.coin;
  if (isFetching) return <Loader />;
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Typography level={2} className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.symbol})
        </Typography>
        <p>
          {data?.data?.coin.name} live price in US dollars View value
          statistics, market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="24h"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Select key={date}>{date}</Select>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails?.price)}
        coinName={data?.data?.coin.name}
      ></LineChart>
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-headline">
            <Typography level={3} className="coin-details-heading">
              {data?.data?.coin.name} Value Statistics
            </Typography>
            <p>An overview showing the stats of {data?.data?.coin.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Typography>{icon}</Typography>
                <Typography>{title}</Typography>
              </Col>
              <Typography className="stats">{value}</Typography>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-headline">
              <Typography level={3} className="coin-details-heading">
                {data?.data?.coin.name} Value Statistics
              </Typography>
              <p>An overview showing the stats of {data?.data?.coin.name}</p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Typography>{icon}</Typography>
                  <Typography>{title}</Typography>
                </Col>
                <Typography className="stats">{value}</Typography>
              </Col>
            ))}
          </Col>
        </Col>
      </Col>
    </Col>
  );
};

export default Cryptodetails;
