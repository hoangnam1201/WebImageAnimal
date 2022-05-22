import React, { useEffect } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { useDispatch, useSelector } from "react-redux";
import { pictureSelector } from "../../store/selectors";
import { getPicutresHash } from "../../store/slices/pictureSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ReviewDialog from "../dialog/reviewDialog";
import { baseURL } from "../../api/instanceAxios";
import { LinearProgress } from "@mui/material";
import CarouselTag from "../CarouselTags.js";

const GalleryImage = () => {
  const picData = useSelector(pictureSelector);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
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
        filter: location.state
          ? location.state
          : { tagIds: [], authorId: undefined },
        page: 0,
        take: picData.take,
      })
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <>
      <CarouselTag />
      <div className="gap-4 py-10 xl:px-12 px-6">
        <p className="text-white text-5xl mb-5 font-bold capitalize">
          {location.state?.message ? location.state?.message : "All Photos"}
        </p>
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
          <div className=" columns-1 md:columns-2 xl:columns-3">
            {picData &&
              picData.list.map((pic, index) => {
                return (
                  <div
                    onClick={() => navigate("/photos/" + pic.id)}
                    className="w-full"
                    key={pic.id}
                  >
                    <div className="relative group overflow-hidden mb-4">
                      <img
                        className="w-full"
                        src={pic.src}
                        alt={pic.title}
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
                              href={getFile(pic)}
                              rel="noreferrer"
                              target="_blank"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
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
