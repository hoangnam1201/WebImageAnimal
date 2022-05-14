import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Admin/header";
import Nav from "../Components/Admin/nav";

const linkList = [
  { label: "Tags", href: "/admin/tags" },
  { label: "Pictures", href: "/admin/pictures" },
  { label: "Users", href: "/admin/users" },
];

const layoutAdmin = () => {
  return (
    <div className="relative flex flex-col min-h-screen overflow-auto">
      <div className="flex grow h-0 flex-wrap overflow-y-auto">
        <Header className="flex w-full justify-between items-center bg-gray-600 shadow-lg grow-0" />
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

export default layoutAdmin;
