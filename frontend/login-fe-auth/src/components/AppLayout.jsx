import React from "react";
import Header from "./Header";
import { Outlet, useNavigation } from "react-router-dom";

const AppLayout = () => {
  // const navigation = useNavigation();

  return (
    <div>
      sono AppLayout e al mio interno ho:
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
