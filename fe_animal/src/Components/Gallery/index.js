import React, { useEffect } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { useDispatch, useSelector } from "react-redux";
import { pictureSelector } from "../../store/selectors";
import { getPicutresHash } from "../../store/slices/pictureSlice";
import { useLocation, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ReviewDialog from "../dialog/reviewDialog";
import { baseURL } from "../../api/instanceAxios";
import { LinearProgress } from "@mui/material";

const GalleryImage = () => {
  const picData = useSelector(pictureSelector);
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();

  const getPictureSroll = () => {
    if (picData.loading === "loading") return;
    dispatch(
      getPicutresHash({
        filter: {
          tagIds: params.id ? [params.id] : [],
        },
        page: picData.page,
        take: picData.take,
      })
    );
  };

  const getFile = (pic) => {
    const index = pic.src.lastIndexOf(".");
    const extention = pic.src.substring(index);
    return baseURL + "file/dowload/" + pic.id + extention;
  };

  useEffect(() => {
    dispatch(
      getPicutresHash({
        filter: {
          tagIds: params.id ? [params.id] : [],
        },
        page: 0,
        take: picData.take,
      })
    );
  }, [location]);

  return (
    <>
      <div className="gap-4 px-4 py-10">
        <ReviewDialog />
        <InfiniteScroll
          dataLength={picData.list.length}
          next={getPictureSroll}
          hasMore={picData.hashMore}
          endMessage={
            <p className="text-white pt-10 text-center">
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className=" columns-3 gap-4">
            {picData &&
              picData.list.map((pic, index) => {
                return (
                  <div className="group mt-4 w-full" key={index}>
                    <div className="relative group ">
                      <img
                        className="w-full"
                        src={pic.src}
                        alt="img1"
                        loading="lazy"
                      />
                      <div className=" absolute w-full bottom-0 left-0 p-2 transition-opacity z-10 opacity-0 group-hover:opacity-100">
                        <div className=" absolute top-0 left-0 w-full h-full bg-slate-600 opacity-30 z-0"></div>
                        <div className="flex justify-between items-center relative z-10">
                          <div>
                            <p className="text-white font-bold">
                              {pic.author?.username}
                            </p>
                          </div>
                          <div>
                            <a
                              className="text-xs bg-gray-200 p-3 rounded-full"
                              variant="contained"
                              href={getFile(pic)}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <DownloadIcon />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div
            className={`${
              picData?.loading === "loading" ? "visible" : "invisible"
            }`}
          >
            <LinearProgress />
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default GalleryImage;
