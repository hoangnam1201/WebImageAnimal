import { Navigate } from "react-router-dom";
import LayoutHome from "../Layouts/layoutHome";
import LayoutAuth from "../Layouts/layoutAuth";
import LoginPage from "../Components/Login";
import RegisterPage from "../Components/Register";
import LayoutGallery from "../Layouts/layoutGallery";
import GalleryImage from "../Components/Gallery";

export const mainRoute = (auth) => [
  { path: "/home", element: <Navigate to="/" /> },
  {
    path: "/",
    element: <LayoutHome />,
    children: [{ path: "", element: <LayoutHome /> }],
  },
];

export const authRoute = () => [
  {
    path: "/auth",
    element: <LayoutAuth />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
];
export const galleryRoute = () => [
  {
    path: "/photos",
    element: <LayoutGallery />,
    children: [{ path: "", element: <GalleryImage /> }],
  },
];
