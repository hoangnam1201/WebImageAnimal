import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tagSelector } from "../../store/selectors";
import { getTag } from "../../store/slices/tagSlice";
import { Link } from "react-router-dom";
import { LinearProgress } from "@mui/material";

const ViewAllTag = () => {
  const tagData = useSelector(tagSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTag());
  }, []);
  return (
    <div className="mb-5">
      <div>
        <h3 className="text-3xl text-white p-10">All Collections</h3>
      </div>
      <div className="gap-4 columns-4 px-10 mt-7">
        {tagData.list.map((item, index) => {
          return (
            <div className="pt-3 ">
              <Link
                className="relative"
                key={index}
                to={`/photos`}
                state={{
                  tagIds: [item.id],
                  authorId: undefined,
                  message: `${item.name} photos`,
                }}
              >
                <img
                  src={item.src}
                  className="w-full pointer-events-none"
                  alt={item.name}
                />
                <h2 className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-shadow-lg text-white">
                  {item.name}
                </h2>
              </Link>
            </div>
          );
        })}
      </div>
      <div
        className={`${
          tagData?.loading === "loading" ? "visible" : "invisible"
        }`}
      >
        <LinearProgress />
      </div>
    </div>
  );
};

export default ViewAllTag;
