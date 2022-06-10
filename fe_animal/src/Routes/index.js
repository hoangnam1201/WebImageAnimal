import { Navigate } from "react-router-dom";
import LayoutDefault from "../Layouts/layoutDefault";
import LayoutAuth from "../Layouts/layoutAuth";
import LoginPage from "../Components/Login";
import RegisterPage from "../Components/Register";
import LayoutAdmin from "../Layouts/layoutAdmin";
import TagList from "../Components/Admin/tag/tagList";
import TagCreate from "../Components/Admin/tag/tagCreate";
import PictureList from "../Components/Admin/picture/pictureList";
import CreatePicture from "../Components/Admin/picture/createPicture";
import LayoutPictureManagement from "../Layouts/layoutPictureManagement";
import RequestedPictures from "../Components/Admin/picture/requestedPictures";
import UserList from "../Components/Admin/user/userList";
import LayoutGallery from "../Layouts/layoutGallery";
import HomePage from "../Components/HomePage";
import MyPictureList from "../Components/MyPictureList";
import Upload from "../Components/upload";
import ChartReview from "../Components/Admin/reviews/chartReview";
import DetailPicture from "../Components/DetailPics";
import NotFound from "../Components/notFound";
import Gallery from "../Components/Gallery";
import AllTag from "../Components/AllTag";
export const mainRoute = (auth) => [
  { path: "home", element: <Navigate to="/" /> },
  { path: "not-found", element: <NotFound /> },
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "my-pictures",
        element: auth ? <MyPictureList /> : <Navigate to="/" />,
      },
      {
        path: "upload",
        element: auth ? (
          auth.user.role === "ADMIN" ? (
            <Navigate to="/admin/pictures/create" />
          ) : (
            <Upload />
          )
        ) : (
          <Navigate to="/auth/login" />
        ),
      },
      {
        path: "/photos",
        element: <LayoutGallery />,
        children: [
          { path: "", element: <Gallery /> },
          { path: ":id", element: <DetailPicture /> },
        ],
      },
      {
        path: "/all-tag",
        element: <LayoutGallery />,
        children: [{ path: "", element: <AllTag /> }],
      },
      { path: "*", element: <Navigate to="/not-found" /> },
    ],
  },
  { path: "*", element: <Navigate to="/not-found" /> },
];

export const authRoute = (auth) => [
  {
    path: "auth",
    element: !auth?.user ? <LayoutAuth /> : <Navigate to="/" />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "*", element: <Navigate to="/not-found" /> },
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
            { path: "*", element: <Navigate to="/not-found" /> },
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
                { path: "*", element: <Navigate to="/not-found" /> },
              ],
            },
            { path: "create", element: <CreatePicture /> },
            { path: "*", element: <Navigate to="/not-found" /> },
          ],
        },
        { path: "users", element: <UserList /> },
        { path: "reviews", element: <ChartReview /> },
        { path: "*", element: <Navigate to="/not-found" /> },
      ],
    },
  ];
};
