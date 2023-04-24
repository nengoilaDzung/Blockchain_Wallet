import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Typography, Select } from "antd";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("auth-token") == null) {
        navigate("/user/login");
      } else {
        try {
          const response = await fetch("http://localhost:8080/me", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
            },
          });
          const data = await response.json();
          setUser(data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchUser();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  localStorage.setItem("userData", JSON.stringify(user));
  const userD = JSON.parse(localStorage.getItem("userData"));
  return (
    <div style={{ height: "100vh" }}>
      <div className="auth" style={{ marginLeft: 20, fontSize: 25 }}>
        Welcome, <span style={{ fontWeight: "bold" }}>{user.name}</span>
      </div>
      <Col className="coin-value-statistics">
        <Col className="coin-value-statistics-headline">
          <Typography
            level={5}
            className="coin-details-heading"
            style={{ marginLeft: 20, fontSize: 30 }}
          >
            Account Overview
          </Typography>
        </Col>
        <Col className="coin-stats">
          <Col className="coin-stats-name" style={{ fontSize: 25 }}>
            <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
              User ID:
            </Typography>
            <Typography style={{ fontSize: 20 }}>{userD._id}</Typography>
          </Col>
          <Typography className="stats">{}</Typography>
        </Col>
        <Col className="coin-stats">
          <Col className="coin-stats-name" style={{ fontSize: 25 }}>
            <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
              User Name:
            </Typography>
            <Typography style={{ fontSize: 20 }}>{userD.name}</Typography>
          </Col>
          <Typography className="stats">{}</Typography>
        </Col>
        <Col className="coin-stats">
          <Col className="coin-stats-name">
            <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
              Account Address:
            </Typography>
            <Typography style={{ fontSize: 20 }}>{userD.publicKey}</Typography>
          </Col>
          <Typography className="stats">{}</Typography>
        </Col>
        <a
          href={`https://sepolia.etherscan.io/address/${userD.publicKey}`}
          target="_blank"
          rel="noreferrer"
          className="viewhistory"
        >
          View Transaction History Through Etherscan
        </a>
      </Col>
    </div>
  );
};

export default Auth;
