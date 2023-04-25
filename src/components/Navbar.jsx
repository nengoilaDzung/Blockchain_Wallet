import React, { useState, useEffect } from "react";
import { Typography, Button, Menu, Avatar } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  WalletOutlined,
  BankOutlined,
  UserOutlined,
  ApiOutlined,
  PartitionOutlined,
  DiffOutlined,
} from "@ant-design/icons";
import icon from "../images/icon.png";
import Balance from "./Balance";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [notLogged, setnotLogged] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    fetch(
      "http://localhost:8080/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
      { withCredentials: true }
    )
      .then((response) => {
        if (response.ok) {
          // remove tokens or session data here
          localStorage.removeItem("auth-token");
          localStorage.removeItem("userData");
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => console.error(error));
  };
  let test = localStorage.getItem("auth-token");

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  useEffect(() => {
    if (test === null) {
      setnotLogged(true);
    } else {
      setnotLogged(false);
    }
  }, [test]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" style={{ marginBottom: 10 }} />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>

      {!notLogged ? (
        <>
          <Balance /> <br />
        </>
      ) : (
        ""
      )}

      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>

          {!notLogged ? (
            <>
              <Menu.Item icon={<BankOutlined />}>
                <Link to="/send">Send Crypto</Link>
              </Menu.Item>
              <Menu.Item icon={<UserOutlined />}>
                <Link to="/user">Profile</Link>
              </Menu.Item>
              <Button
                type="button"
                className="signout"
                onClick={handleLogout}
                style={{ marginTop: 10 }}
              >
                <ApiOutlined /> Sign Out
              </Button>
            </>
          ) : (
            <>
              <Menu.Item icon={<PartitionOutlined />}>
                <Link className="signin" to="/user/login">
                  Sign In
                </Link>
              </Menu.Item>
              <Menu.Item icon={<DiffOutlined />}>
                <Link className="signin" to="/user/register">
                  Sign Up
                </Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
