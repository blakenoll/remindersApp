import React from "react";
import Navbar from "./navbar";
import GlobalStyle from "./globalStyle";

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <Navbar />
    {children}
  </>
);

export default Layout;
