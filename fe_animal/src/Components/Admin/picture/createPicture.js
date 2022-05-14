import { Alert, Autocomplete, LinearProgress, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { pictureSelector, tagSelector } from "../../../store/selectors";
import { createPicture } from "../../../store/slices/pictureSlice";
import { getTag } from "../../../store/slices/tagSlice";

const CreatePicture = () => {
  const tagData = useSelector(tagSelector);
  const pictureData = useSelector(pictureSelector);
  const [objectURL, setObjectURL] = useState(null);
  const dispatch = useDispatch();
  const imageInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    control,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    register("file", { required: "required" });
  }, [register]);

  useEffect(() => {
    if (pictureData.loading === "success") {
      resetField("title");
      resetField("file");
      resetField("tags");
      imageInputRef.current.value = null;
      setObjectURL(null);
    }
  }, [pictureData.loading, resetField]);

  const onChangeFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setValue("file", e.target.files[0], { shouldValidate: true });
      setObjectURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onCreate = (data) => {
    console.log(data);
    const fd = new FormData();
    fd.append("file", data.file);
    fd.append("title", data.title);
    data.tags.forEach((t, index) => {
      fd.append(`tags[${index}][id]`, t.id);
    });

    dispatch(createPicture(fd));
  };

  return (
    <div className="p-4">
      <div className="text-xl font-semibold shadow p-4">
        <Link
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          to="../"
        >
          Picture Management
        </Link>
        / create
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
      <div className="flex gap-8 pt-3">
        <div className="w-1/3 p-4 shadow-md flex flex-col gap-3">
          <div className=" text-gray-400 group">
            <p>Title*:</p>
          </div>
          <div className="relative">
            <input
              className={`shadow-md outline-none w-full p-2 ${
                errors.title ? "border-red-400 border" : "border-blue-300"
              } focus:border `}
              {...register("title", { required: "Required", minLength: 5 })}
              name="title"
              autoComplete="off"
            />
            <p className=" text-xs text-red-400 absolute -top-0 transform -translate-y-full -translate-x-full left-full whitespace-nowrap">
              {errors?.title?.type === "minLength" && "min length is 5"}
              {errors?.title?.type === "required" && "required"}
            </p>
          </div>
          <div className=" text-gray-400 group">
            <p>Tags*:</p>
          </div>
          <div className="relative">
            <p className=" text-xs text-red-400 absolute -top-0 transform -translate-y-full -translate-x-full left-full">
              {errors.tags?.message}
            </p>
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
                    />
                  )}
                />
              )}
            />
          </div>
          <div>
            <div className=" text-gray-400">
              <p>Image*:</p>
              <p className=" text-sm text-red-400"></p>
            </div>
            <div className="relative">
              <p className=" text-xs text-red-400 absolute -top-0 transform -translate-y-full -translate-x-full left-full">
                {errors.file?.message}
              </p>
              <label
                className={`block rounded-md py-2 px-5 font-thin  shadow-lg text-center ${
                  errors.image && "border border-red-400"
                }`}
              >
                Choose image
                <input
                  onChange={onChangeFile}
                  className="hidden"
                  type="file"
                  accept=".png, .apng, .avif, .gif, .jpg, .jpeg, .jfig, .pjpeg, .pjp"
                  multiple={false}
                  ref={imageInputRef}
                />
                <p className=" text-xs text-red-400 absolute -top-0 transform -translate-y-full -translate-x-full left-full">
                  {errors.image?.message}
                </p>
              </label>
            </div>
            <div className="pt-4 flex justify-center">
              <button
                className="px-10 rounded-md py-2 bg-blue-400 text-white hover:bg-blue-500 shadow-md"
                onClick={handleSubmit(onCreate)}
                disabled={pictureData?.createLoading === "loading"}
              >
                Create
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/3">
          {objectURL && (
            <div className="shadow-md p-2">
              <img id="target" src={objectURL} alt="tag" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePicture;
