import React from "react";
import Header from "./header";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
      {/* <Footer /> */}
    </main>
  );
};

export default Layout;
