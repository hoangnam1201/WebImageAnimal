import { Navigate } from "react-router-dom";
import LayoutHome from "../Layouts/layoutHome";
import LayoutAuth from "../Layouts/layoutAuth";
import LoginPage from "../Components/Login";
import RegisterPage from "../Components/Register";
import LayoutAdmin from "../Layouts/layoutAdmin";
import TagList from "../Components/Admin/tag/tagList";
import UserList from "../Components/Admin/userList";
import TagCreate from "../Components/Admin/tag/tagCreate";
import PictureList from "../Components/Admin/picture/pictureList";
import CreatePicture from "../Components/Admin/picture/createPicture";
import LayoutGallery from "../Layouts/layoutGallery";
import GalleryImage from "../Components/Gallery";
import LayoutPictureManagement from "../Layouts/layoutPictureManagement";
import RequestedPictures from "../Components/Admin/picture/requestedPictures";

export const mainRoute = (auth) => [
  { path: "home", element: <Navigate to="/" /> },
  {
    path: "/",
    element: <LayoutHome />,
    children: [{ path: "", element: <LayoutHome /> }],
  },
];

export const authRoute = (auth) => [
  {
    path: "auth",
    element: !auth?.user ? <LayoutAuth /> : <Navigate to="/" />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
];

export const adminRoute = (auth) => {
  return [
    {
      path: "admin",
      element:
        auth?.user?.role === "ADMIN" ? <LayoutAdmin /> : <Navigate to="/" />,
      children: [
        { path: "", element: <Navigate to="/admin/tags/list" /> },
        {
          path: "tags",
          children: [
            { path: "", element: <Navigate to="list" /> },
            { path: "list", element: <TagList /> },
            { path: "create", element: <TagCreate /> },
          ],
        },
        {
          path: "pictures",
          children: [
            { path: "", element: <Navigate to="list" /> },
            {
              path: "list",
              element: <LayoutPictureManagement />,
              children: [
                { path: "", element: <PictureList /> },
                { path: "requesteds", element: <RequestedPictures /> },
              ],
            },
            { path: "create", element: <CreatePicture /> },
          ],
        },
        { path: "users", element: <UserList /> },
      ],
    },
  ];
};

export const galleryRoute = () => [
  {
    path: "/photos",
    element: <LayoutGallery />,
    children: [{ path: "", element: <GalleryImage /> }],
  },
];
