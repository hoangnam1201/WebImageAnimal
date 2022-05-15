import { Alert, LinearProgress, TablePagination } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSelector } from "../../../store/selectors";
import { getUsers, selectUser } from "../../../store/slices/userSlice";

const UserList = () => {
  const usersData = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getUsers({
        searchStr: usersData.searchStr,
        page: usersData.page,
        take: usersData.take,
      })
    );
  }, [dispatch]);

  const onRowsPerPageChange = (e) => {
    dispatch(
      getUsers({
        searchStr: usersData.searchStr,
        page: 0,
        take: e.target.value,
      })
    );
  };

  const onPageChange = (e, value) => {
    dispatch(
      getUsers({
        searchStr: usersData.searchStr,
        page: value,
        take: usersData.take,
      })
    );
  };

  return (
    <div className="p-4">
      <div className=" shadow p-4 items-center">
        <p className=" text-xl font-semibold">User Management</p>
      </div>
      <div
        className={`${
          usersData?.loading === "loading" ? "visible" : "invisible"
        }`}
      >
        <LinearProgress />
      </div>
      {usersData?.loading === "error" && (
        <Alert severity="error" className="uppercase">
          {usersData?.error}
        </Alert>
      )}
      {usersData?.loading === "success" && (
        <Alert severity="success" className="uppercase">
          Create success
        </Alert>
      )}
      <div className="p-4">
        <div className="md:flex md:gap-4 mt-5">
          <div className="w-0 grow shadow p-4 min-w-min ">
            <div className="flex w-full mt-4 flex-col">
              <div className="w-full font-semibold border-b-2 flex gap-4 p-3">
                <p className="w-1/3">Email</p>
                <p className="w-1/3">Username</p>
                <p className="w-1/6">Role</p>
                <p className="w-1/6">Number of pictures</p>
              </div>
              {usersData &&
                usersData.list.map((p, index) => {
                  return (
                    <div
                      className={`gap-4 w-full font-semibold p-3 hover:bg-gray-100 rounded-sm flex ${
                        p.id === usersData?.current?.id &&
                        "border border-blue-400"
                      }`}
                      onClick={() => {
                        dispatch(selectUser(p));
                      }}
                      key={index}
                    >
                      <div className="w-1/3 text-gray-400 break-all">
                        <p>{p.email}</p>
                      </div>
                      <div className="w-1/3 text-gray-400">
                        <p>{p.username}</p>
                      </div>
                      <div className="w-1/6">
                        {p.role === "ADMIN" && (
                          <p className="text-green-500">ADMIN</p>
                        )}
                        {p.role === "USER" && (
                          <p className="text-gray-500">USER</p>
                        )}
                      </div>
                      <div className="w-1/6">{p._count.pictures}</div>
                    </div>
                  );
                })}
              <div className="flex justify-center">
                <TablePagination
                  component="div"
                  count={usersData?.total}
                  page={usersData?.page}
                  onPageChange={onPageChange}
                  rowsPerPageOptions={[5, 25, 50]}
                  rowsPerPage={usersData?.take}
                  onRowsPerPageChange={onRowsPerPageChange}
                />
              </div>
            </div>
          </div>
          <div
            className={`${
              usersData.current ? "w-1/3" : "w-0"
            }  transition-all overflow-hidden`}
          >
            {usersData.current && (
              <div className="shadow">
                <div className="p-4 flex gap-3 flex-col">
                  <div className="flex gap-4">
                    <p className="text-gray-400 font-thin">email: </p>
                    <p className=" tracking-wide">{usersData.current.email}</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="text-gray-400 font-thin">username: </p>
                    {usersData.current.username}
                  </div>
                  <div className="flex gap-4 items-end">
                    <p className="text-gray-400 font-thin">role: </p>
                    {usersData.current.role === "ADMIN" && (
                      <p className="text-green-500">ADMIN</p>
                    )}
                    {usersData.current.role === "USER" && (
                      <p className="text-gray-500">USER</p>
                    )}
                  </div>
                  <div className="flex gap-4 items-end">
                    <p className="text-gray-400 font-thin">
                      Number of pictures:
                    </p>
                    <p>{usersData.current._count.pictures}</p>
                    <button
                      className="bg-blue-500 text-white shadow hover:bg-blue-600 rounded-md p-1 outline-none"
                      onClick={() => {
                        navigate("/admin/pictures/list", {
                          state: { author: usersData.current },
                        });
                      }}
                    >
                      view
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
