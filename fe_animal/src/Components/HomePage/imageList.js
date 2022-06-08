import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tagSelector } from "../../store/selectors";
import { getTag } from "../../store/slices/tagSlice";
import { Link } from "react-router-dom";

const ImageList = () => {
  const tagData = useSelector(tagSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTag());
  }, []);

  return (
    <div className="p-12 text-gray-500">
      <div className="flex justify-between mx-16 items-center">
        <div>
          <h2 className="font-bold text-4xl mb-4">
            Browse high-resolution photo collections
          </h2>
          <h4>Browse high-resolution photo collections</h4>
        </div>
        <Button
          style={{ color: "white", borderColor: "white", height: "50px" }}
          variant="outlined"
        >
          View all collections
        </Button>
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
    </div>
  );
};

export default ImageList;
