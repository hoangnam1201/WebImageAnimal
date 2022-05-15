import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Admin/nav";
import Header from "../Components/Header";

const linkList = [
  { label: "Tags", href: "/admin/tags" },
  { label: "Pictures", href: "/admin/pictures" },
  { label: "Users", href: "/admin/users" },
];

const LayoutAdmin = () => {
  return (
    <div className="relative flex flex-col min-h-screen overflow-auto">
      <Header />
      <div className="flex grow h-0 flex-wrap overflow-y-auto">
        <Nav
          orientation="vertical"
          className="w-1/6 h-full shadow-lg pt-4 sticky top-0 self-start"
          linkList={linkList}
        />
        <div className="w-5/6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
