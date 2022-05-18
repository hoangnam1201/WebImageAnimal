import { Alert, LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { tagSelector } from "../../../store/selectors";
import { createTag } from "../../../store/slices/tagSlice";

const TagCreate = () => {
  const [objectURL, setObjectURL] = useState(null);
  const [file, setFile] = useState(null);
  const inputFileRef = useRef(null);
  const tagData = useSelector(tagSelector);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm({ mode: "onChange" });

  const fileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(() => {
        return e.target.files[0];
      });
      clearErrors("image");
      setObjectURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    if (tagData?.createLoading === "success") {
      reset({ name: "" });
      inputFileRef.current.value = null;
      setObjectURL(null);
      setFile(null);
    }
  }, [tagData?.createLoading]);

  const onCreate = async (data) => {
    if (!file) {
      setError("image", { type: "required", message: "Required" });
      return;
    }

    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("file", file);
    dispatch(createTag(fd));
  };

  return (
    <div className="p-4">
      <div className="text-xl font-semibold shadow p-4">
        <Link
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          to="../"
        >
          Tag Management
        </Link>
        / create
      </div>
      <div
        className={`${
          tagData?.createLoading === "loading" ? "visible" : "invisible"
        }`}
      >
        <LinearProgress />
      </div>
      {tagData?.createLoading === "error" && (
        <Alert severity="error" className="uppercase">
          {tagData?.error}
        </Alert>
      )}
      {tagData?.createLoading === "success" && (
        <Alert severity="success" className="uppercase">
          Create success
        </Alert>
      )}
      <div className="flex gap-8 min-w-min">
        <div className="p-4 flex gap-3 flex-col shadow-md">
          <div className="min-w-max">
            <div className=" text-gray-400 group">
              <p>Tag name*:</p>
            </div>
            <div className="relative w-full">
              <input
                className={`shadow-md w-full outline-none p-2 ${
                  errors.name ? "border-red-400 border" : "border-blue-300"
                } focus:border `}
                {...register("name", { required: "Required" })}
                name="name"
                autoComplete="off"
              />
              <p className=" text-xs text-red-400 absolute -top-0 transform -translate-y-full -translate-x-full left-full">
                {errors.name?.message}
              </p>
            </div>
          </div>
          <div>
            <div className=" text-gray-400">
              <p>Image*:</p>
              <p className=" text-sm text-red-400"></p>
            </div>
            <div className="relative">
              <label
                className={`block rounded-md py-2 px-5 font-thin  shadow-lg text-center ${
                  errors.image && "border border-red-400"
                }`}
              >
                Choose image
                <input
                  onChange={fileChange}
                  className="hidden"
                  type="file"
                  accept=".png, .apng, .avif, .gif, .jpg, .jpeg, .jfig, .pjpeg, .pjp"
                  multiple={false}
                  ref={inputFileRef}
                />
                <p className=" text-xs text-red-400 absolute -top-0 transform -translate-y-full -translate-x-full left-full">
                  {errors.image?.message}
                </p>
              </label>
            </div>
          </div>
          <div className="pt-4 flex justify-center">
            <button
              className="px-10 rounded-md py-2 bg-blue-400 text-white hover:bg-blue-500 shadow-md"
              onClick={handleSubmit(onCreate)}
              disabled={tagData?.createLoading === "loading"}
            >
              Create
            </button>
          </div>
        </div>
        {objectURL && (
          <div className="shadow-md p-2 xl:w-1/3 lg:w-1/2">
            <p className=" text-gray-400">Tag image:</p>
            <img id="target" src={objectURL} alt="tag" className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TagCreate;
