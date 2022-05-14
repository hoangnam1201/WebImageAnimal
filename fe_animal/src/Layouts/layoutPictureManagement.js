import { Alert, LinearProgress, Link } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Admin/nav";
import { pictureSelector } from "../store/selectors";

const LayoutPictureManagement = () => {
  const pictureData = useSelector(pictureSelector);
  return (
    <div className="p-4">
      <div className=" shadow p-4 flex justify-between items-center">
        <p className=" text-xl font-semibold">Picture Management</p>
        <Link
          className="py-2 px-10 text-bule shadow-md font-semibold rounded-sm block"
          href="/admin/pictures/create"
          underline="none"
        >
          New Picture
        </Link>
      </div>
      <div
        className={`${
          pictureData?.loading === "loading" ? "visible" : "invisible"
        }`}
      >
        <LinearProgress />
      </div>
      {pictureData?.loading === "error" && (
        <Alert severity="error" className="uppercase">
          {pictureData?.error}
        </Alert>
      )}
      {pictureData?.loading === "success" && (
        <Alert severity="success" className="uppercase">
          Create success
        </Alert>
      )}
      <Nav
        className="w-full"
        linkList={[
          {
            label: "Accepted pictures",
            href: "/admin/pictures/list",
          },
          {
            label: "Requested pictures",
            href: "/admin/pictures/list/requesteds",
          },
        ]}
      />
      <Outlet />
    </div>
  );
};

export default LayoutPictureManagement;
