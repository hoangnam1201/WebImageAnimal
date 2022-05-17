import React, { useEffect } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton, LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { pictureSelector } from "../../store/selectors";
import { getPicutresHash } from "../../store/slices/pictureSlice";
import { useLocation, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const GalleryImage = () => {
  const picData = useSelector(pictureSelector);
  console.log(picData);
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();

  const getPictureSroll = () => {
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
  useEffect(() => {
    getPictureSroll();
  }, [location]);

  return (
    <>
      <div
        className={`${
          picData?.loading === "loading" ? "visible" : "invisible"
        }`}
      >
        <LinearProgress />
      </div>
      <div className="gap-4 columns-4 px-4 py-10">
        <InfiniteScroll
          dataLength={picData.list.length} //This is important field to render the next data
          next={getPictureSroll}
          hasMore={picData.hashMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p className="text-white pt-10 text-center">
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
          // // refreshFunction={this.refresh}
          // pullDownToRefresh
          // pullDownToRefreshThreshold={50}
          // pullDownToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}>
          //     &#8595; Pull down to refresh
          //   </h3>
          // }
          // releaseToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          // }
        >
          {picData &&
            picData.list.map((pic, index) => {
              return (
                <div className="group relative overflow-hidden" key={index}>
                  <img
                    className="pt-2 group-hover:scale-105 w-full"
                    src={pic.src}
                    alt="img1"
                  />
                  <IconButton
                    className="absolute text-xs w-auto bg-green-600 bottom-7 left-3/4 transform translate-x-8 translate-y-5 z-30 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
                    variant="contained"
                  >
                    <DownloadIcon />
                  </IconButton>
                </div>
              );
            })}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default GalleryImage;
