import {
  Alert,
  Autocomplete,
  LinearProgress,
  Link,
  TablePagination,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { pictureSelector, tagSelector } from "../../../store/selectors";
import {
  deletePicture,
  getPicutres,
  updateInfoPicture,
} from "../../../store/slices/pictureSlice";
import { selectPicture } from "../../../store/slices/pictureSlice";
import { getTag } from "../../../store/slices/tagSlice";
import FilterBox from "./filterBox";

const PictureList = () => {
  const pictureData = useSelector(pictureSelector);
  const tagData = useSelector(tagSelector);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    register("title", { required: "required" });
  }, [register]);

  useEffect(() => {
    if (!pictureData.current) return;
    reset({ tags: pictureData.current.tags, title: pictureData.current.title });
  }, [pictureData, reset]);

  useEffect(() => {
    console.log("get");
    dispatch(
      getPicutres({
        filter: pictureData.filter,
        page: pictureData.page,
        take: pictureData.take,
      })
    );
  }, [dispatch]);

  const onRowsPerPageChange = (e) => {
    dispatch(
      getPicutres({
        filter: pictureData.filter,
        page: 0,
        take: e.target.value,
      })
    );
  };

  const onPageChange = (e, value) => {
    dispatch(
      getPicutres({
        filter: pictureData.filter,
        page: value,
        take: pictureData.take,
      })
    );
  };

  const updateHandler = (data) => {
    console.log(data);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          updateInfoPicture({
            id: pictureData.current.id,
            data: {
              title: data.title,
              tags: data.tags.map((t) => ({ id: t.id })),
            },
          })
        );
      }
    });
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
        dispatch(deletePicture(id));
      }
    });
  };

  return (
    <div className="p-4">
      <div className="md:flex md:gap-4 mt-5">
        <div className="w-0 grow shadow p-4 min-w-min ">
          <div>
            <FilterBox
              onChange={(value) => {
                dispatch(
                  getPicutres({
                    filter: {
                      authorId: value.authorId,
                      tagIds: value.tagIds,
                    },
                    page: pictureData.page,
                    take: pictureData.take,
                  })
                );
              }}
            />
          </div>
          <div className="flex w-full mt-4 flex-col">
            <div className="w-full font-semibold border-b-2 flex gap-4 p-3">
              <p className="w-1/6">image</p>
              <p className="w-1/3">title</p>
              <p className="w-1/6">created at</p>
              <p className="w-1/3">tag</p>
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
                    <div className="w-1/6">
                      <img
                        src={p.src}
                        alt="cute cat"
                        key={p.id}
                        loading="lazy"
                      />
                    </div>
                    <div className="w-1/3 text-gray-400">
                      <p>{p.title}</p>
                    </div>
                    <div className="text-gray-500 font-light w-1/6">
                      <p>{new Date(p.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="w-1/3">
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
          className={`${
            pictureData.current ? "w-1/3" : "w-0"
          }  transition-all overflow-hidden`}
        >
          {pictureData.current && (
            <div className="shadow">
              <div className="p-4 flex gap-3 flex-col">
                <img
                  src={pictureData.current.src}
                  alt="error"
                  key={pictureData.current.id}
                />
                <div className="flex gap-4">
                  <p className="text-gray-400 font-thin">Poster: </p>
                  <p className=" tracking-wide">
                    {pictureData.current.author?.username}
                  </p>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-400 font-thin">Title: </p>
                  <div className="w-0 grow">
                    <textarea
                      rows={3}
                      className={`w-full p-2 resize-none scroll scrollbar scrollbar-1 outline-none focus:text-gray-500 focus:font-normal focus:border-2 shadow-md text-gray-500 font-light ${
                        errors.title
                          ? "border-2 border-red-600"
                          : "border-blue-500"
                      }`}
                      {...register("title", {
                        required: "required",
                        minLength: 5,
                      })}
                    />
                    {errors.title && (
                      <p className=" text-xs font-normal text-red-700">
                        {errors?.title?.type === "minLength" &&
                          "min length is 5"}
                        {errors?.title?.type === "required" && "required"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-400 font-thin">tags: </p>
                  <div className="w-0 grow">
                    <Controller
                      control={control}
                      name="tags"
                      rules={{ required: "required" }}
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Autocomplete
                          multiple
                          onChange={(e, value) => {
                            onChange(value);
                          }}
                          onOpen={() => {
                            dispatch(getTag());
                          }}
                          name={name}
                          value={value ? value : []}
                          ref={ref}
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
                              error={!!errors.tags}
                              helperText={errors?.tags?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-around mt-3">
                  {isDirty && (
                    <button
                      className="py-2 px-10 text-white bg-blue-400 hover:bg-blue-500 hover:font-medium shadow-sm rounded-sm"
                      onClick={handleSubmit(updateHandler)}
                    >
                      Update
                    </button>
                  )}
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

export default PictureList;
