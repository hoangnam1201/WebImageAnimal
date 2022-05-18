import {
  Autocomplete,
  LinearProgress,
  TablePagination,
  TextField,
} from "@mui/material";
import LinkMUI from "@mui/material/Link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { pictureSelector, tagSelector } from "../../store/selectors";
import {
  getMyPicutres,
  getPicutres,
  resetPictures,
  selectPicture,
} from "../../store/slices/pictureSlice";
import { getTag } from "../../store/slices/tagSlice";

const MyPictureList = () => {
  const pictureData = useSelector(pictureSelector);
  const dispatch = useDispatch();
  const tagData = useSelector(tagSelector);

  useEffect(() => {
    dispatch(
      getMyPicutres({
        filter: pictureData.filter,
        page: pictureData.page,
        take: pictureData.take,
      })
    );
    window.history.replaceState({}, document.title);
    return () => {
      dispatch(resetPictures());
    };
  }, []);

  const onRowsPerPageChange = (e) => {
    dispatch(
      getMyPicutres({
        filter: pictureData.filter,
        page: 0,
        take: e.target.value,
      })
    );
  };

  const onPageChange = (e, value) => {
    dispatch(
      getMyPicutres({
        filter: pictureData.filter,
        page: value,
        take: pictureData.take,
      })
    );
  };

  const deleteHandler = (id) => {
    if (!id) return;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteHandler(id));
      }
    });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div
        className={`${
          pictureData?.loading === "loading" ? "visible" : "invisible"
        }`}
      >
        <LinearProgress />
      </div>
      <div className="md:flex md:gap-4 mt-5">
        <div className="w-0 grow shadow p-4 min-w-min ">
          <div className=" max-w-xs shadow p-2">
            <p className=" font-medium">Filter</p>
            <Autocomplete
              multiple
              onChange={(e, value) => {
                dispatch(
                  getPicutres({
                    filter: {
                      tagIds: value.map(({ id }) => id),
                    },
                    page: pictureData.page,
                    take: pictureData.take,
                  })
                );
              }}
              onOpen={() => {
                dispatch(getTag());
              }}
              loading={tagData.loading === "loading"}
              options={tagData.list}
              getOptionLabel={(o) => o.name}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  className="shadow"
                  label="Tags"
                />
              )}
            />
          </div>
          <div className="flex w-full mt-4 flex-col">
            <div className="w-full font-semibold border-b-2 flex gap-4 p-3">
              <p className="w-1/5">image</p>
              <p className="w-1/5">title</p>
              <p className="w-1/5">created at</p>
              <p className="w-1/5">tag</p>
              <p className="w-1/5">status</p>
            </div>
            {pictureData &&
              pictureData.list.map((p, index) => {
                return (
                  <div
                    className={`gap-4 w-full font-semibold p-3 hover:bg-gray-100 rounded-sm flex ${
                      p.id === pictureData?.current?.id &&
                      "border border-blue-400"
                    }`}
                    onClick={() => {
                      dispatch(selectPicture(p));
                    }}
                    key={index}
                  >
                    <div className="w-1/5">
                      <img
                        src={p.src}
                        alt="cute cat"
                        key={p.id}
                        loading="lazy"
                      />
                    </div>
                    <div className="w-1/5 text-gray-400">
                      <p>{p.title}</p>
                    </div>
                    <div className="text-gray-500 font-light w-1/5">
                      <p>{new Date(p.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="w-1/5">
                      <div className="flex items-center gap-2 flex-wrap">
                        {p.tags.map((t, _index) => (
                          <div
                            key={_index}
                            className="py-1 px-3 bg-gray-200 rounded-md"
                          >
                            {t.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-1/5">
                      {!p.accepted && (
                        <p className="text-yellow-500">request</p>
                      )}
                      {p.accepted && <p className="text-blue-500">accepted</p>}
                    </div>
                  </div>
                );
              })}
            <div className="flex justify-center">
              <TablePagination
                component="div"
                count={pictureData?.total}
                page={pictureData?.page}
                onPageChange={onPageChange}
                rowsPerPageOptions={[5, 25, 50]}
                rowsPerPage={pictureData?.take}
                onRowsPerPageChange={onRowsPerPageChange}
              />
            </div>
          </div>
        </div>
        <div
          className={`${pictureData.current ? "w-1/3" : "w-0"}  transition-all`}
        >
          {pictureData.current && (
            <div className="shadow-md overflow-hidden">
              <div className="p-4 flex gap-3 flex-col">
                <img
                  src={pictureData.current.src}
                  alt="error"
                  key={pictureData.current.id}
                />
                <div className="flex gap-4">
                  <p className="text-gray-400 font-thin">src: </p>
                  <LinkMUI
                    className=" tracking-wide break-all"
                    href={pictureData.current.src}
                    target="_blank"
                  >
                    {pictureData.current.src}
                  </LinkMUI>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-400 font-thin">Title: </p>
                  <div className="w-0 grow h-20 shadow-md p-2 text-gray-500 font-light">
                    {pictureData.current.title}
                  </div>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-400 font-thin">tags: </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {pictureData.current.tags.map((t, _index) => (
                      <div
                        key={_index}
                        className="py-1 px-3 bg-gray-200 rounded-md"
                      >
                        {t.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-around mt-3">
                  <button
                    className="py-2 px-10 text-red-400 shadow-md hover:shadow-lg hover:font-medium rounded-sm"
                    onClick={() => deleteHandler(pictureData?.current?.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPictureList;
