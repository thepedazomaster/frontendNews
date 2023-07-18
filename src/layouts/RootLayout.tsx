import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/authProvider";

const navItems: MenuProps["items"] = [
  {
    key: "/topNews",
    label: "Titulares principales",
  },
  {
    key: "/generalNews",
    label: "Titulares Generales",
  },
  {
    key: "/newsUser",
    label: "Mis Noticias",
  },
  { key: "logOut", label: "Cerrar sesion" },
];

function RootLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedWitdth, setCollapsedWitdth] = useState<number | undefined>(
    undefined
  );
  const { logOut } = useContext(AuthContext);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        theme="light"
        breakpoint={"md"}
        onBreakpoint={(broken) => {
          broken ? setCollapsedWitdth(0) : setCollapsedWitdth(undefined);
        }}
        collapsedWidth={collapsedWitdth}
        onCollapse={() => {
          toggleCollapsed();
        }}
      >
        <div style={{ padding: "5px" }}>
          <img src="equipzilla.png" alt="logo" style={{ width: "100%" }} />{" "}
        </div>
        <Menu
          items={navItems}
          mode="inline"
          theme={"light"}
          onClick={({ key }) => {
            if (key === "logOut") {
              logOut();
              navigate("/login");
            } else {
              navigate(key);
            }
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "#f4533b",
          }}
        >
          {typeof collapsedWitdth !== "number" ? (
            <Button type="primary" onClick={toggleCollapsed}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          ) : null}
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Buscador elaborado por bryan Hernandez 2023
        </Footer>
      </Layout>
    </Layout>
  );
}

export default RootLayout;
