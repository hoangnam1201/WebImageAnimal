import { Alert, LinearProgress, Link } from "@mui/material";
import { current } from "@reduxjs/toolkit";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { tagSelector } from "../../../store/selectors";
import {
  deleteTag,
  getTag,
  selectTag,
  updateImageTag,
  updateTagName,
} from "../../../store/slices/tagSlice";

const TagList = () => {
  const tagData = useSelector(tagSelector);
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    reset,
    clearErrors,
  } = useForm({ mode: "onChange" });

  const fileChangeHandler = (e) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0] && tagData.current) {
      const fb = new FormData();
      fb.append("file", e.target.files[0]);
      dispatch(updateImageTag({ tagId: tagData.current.id, formdata: fb }));
      fileInputRef.current.value = null;
    }
  };

  useEffect(() => {
    dispatch(getTag());
  }, []);

  useEffect(() => {
    if (tagData.current) reset({ name: tagData?.current?.name });
  }, [tagData?.current]);

  const selectTagHandle = (tag) => {
    if (isDirty) {
      Swal.fire({
        title: "are you sure?",
        text: "any changes will not be saved",
        icon: "question",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(selectTag(tag));
        }
      });
      return;
    }
    dispatch(selectTag(tag));
  };

  const deleteHandle = (id) => {
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
        dispatch(deleteTag(id));
      }
    });
  };

  const updateNameHandler = (data) => {
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
        dispatch(updateTagName({ tagId: tagData.current.id, name: data.name }));
      }
    });
  };

  return (
    <div className="p-4">
      <div className=" shadow p-4 flex justify-between items-center">
        <p className=" text-xl font-semibold">Tag Management</p>
        <Link
          className="py-2 px-10 text-bule shadow-md font-semibold rounded-sm block"
          href="/admin/tags/create"
          underline="none"
        >
          New Tag
        </Link>
      </div>
      <div
        className={`${
          tagData?.loading === "loading" ? "visible" : "invisible"
        }`}
      >
        <LinearProgress />
      </div>
      {tagData?.loading === "error" && (
        <Alert severity="error" className="uppercase">
          {tagData?.error}
        </Alert>
      )}
      {tagData?.loading === "success" && (
        <Alert severity="success" className="uppercase">
          success
        </Alert>
      )}
      <div className="md:flex md:gap-4 mt-5">
        <div className="flex-grow shadow p-4">
          <p className="font-semibold"> Tag List </p>
          <div className="flex w-full mt-4 flex-col">
            <div className="flex gap-4 w-full font-semibold border-b-2 p-3">
              <p className="w-2/3">name</p>
              <p className="w-1/3">picture number</p>
            </div>
            {tagData?.list.map((tag, index) => {
              const { name, _count } = tag;
              return (
                <div
                  className={`flex gap-4 w-full hover:bg-gray-100 p-3 rounded-md ${
                    tagData.current?.id === tag.id && "border border-blue-400"
                  }`}
                  key={index}
                  onClick={() => selectTagHandle(tag)}
                >
                  <p className="w-2/3">{name}</p>
                  <p className="w-1/3">{_count.pictures}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={`transition-all duration-300 ${
            tagData.current ? "md:w-1/3" : "w-0"
          }`}
        >
          <div className="overflow-hidden shadow-md">
            <div className="p-4">
              <p className="font-semibold">Cat Tag</p>
              <div className="pt-3 flex flex-col gap-3 text-sm">
                <div className="relative group">
                  <img
                    src={tagData?.current?.src}
                    alt="tag"
                    key={tagData?.current?.id}
                  />
                  <div className=" absolute z-10 opacity-30 top-0 left-0 bg-gray-700 w-full h-full hidden group-hover:flex justify-center items-center">
                    <label className="bg-white py-2 px-10 font-medium rounded-md text-lg shadow-md block hover:bg-gray-200">
                      change
                      <input
                        onChange={fileChangeHandler}
                        className="hidden"
                        type="file"
                        accept=".png, .apng, .avif, .gif, .jpg, .jpeg, .jfig, .pjpeg, .pjp"
                        multiple={false}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <p className="text-gray-400">src: </p>
                  <Link href={tagData?.current?.src} target="_blank">
                    <p className="break-all">{tagData?.current?.src}</p>
                  </Link>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="text-gray-400">Name: </p>
                  <input
                    className={`p-1 outline-none focus:border shadow-md ${
                      errors.name ? "border border-red-400" : "border-blue-400"
                    }`}
                    type="text"
                    {...register("name", {
                      required: "Required",
                    })}
                  />
                  <p className="text-red-400 text-sm">{errors.name?.message}</p>
                </div>
                <p>
                  <span className="text-gray-400">Picture number: </span>
                  {tagData?.current?._count.pictures}
                </p>
              </div>
              <div className="flex justify-around mt-3">
                {isDirty && (
                  <button
                    className="py-2 px-10 text-white bg-blue-400 hover:bg-blue-500 hover:font-medium shadow-sm rounded-sm"
                    onClick={handleSubmit(updateNameHandler)}
                  >
                    update
                  </button>
                )}
                <button
                  className="py-2 px-10 text-red-400 shadow-md hover:shadow-lg hover:font-medium rounded-sm"
                  onClick={() => deleteHandle(tagData?.current?.id)}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagList;
