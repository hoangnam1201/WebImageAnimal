import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pictureApi } from "../../api/pictureApi";
import { baseURL } from "../../api/instanceAxios";

const DetailPicture = () => {
  const params = useParams();
  const [picData, setPicData] = useState({});
  console.log(picData);
  const getPicById = async () => {
    try {
      const res = await pictureApi.getPictureById(params.id);
      setPicData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPicById();
  }, [params.id]);

  const getFile = (pic) => {
    const index = pic?.src?.lastIndexOf(".");
    const extention = pic?.src?.substring(index);
    return baseURL + "file/dowload/" + pic.id + extention;
  };
  return (
    <div>
      <div className="bg-black text-white">
        <button
          onClick={() => window.history.back()}
          className="ml-5 mt-5 bg-lime-900 rounded-md w-14"
        >
          Trở lại
        </button>
      </div>
      <div className="flex justify-center items-center bg-black text-white min-h-screen">
        <div className="w-1/4 flex flex-col pl-20">
          <h2 className="font-bold text-3xl py-10">{picData?.title}</h2>
          <h3>
            Photo of two customized cars on a city side street. One car is
            raised up and the other is very low.
          </h3>
          <a
            rel="noreferrer"
            target="_blank"
            href={getFile(picData)}
            className="p-3"
          >
            <button className="bg-green-600 rounded-md my-5 h-10 w-44">
              Download free photo
            </button>
          </a>
          <h2 className="flex font-bold py-3">
            Photo by:{" "}
            <p className="ml-2 underline">{picData?.author?.username}</p>
          </h2>
          <h2 className="py-3">
            Featured in:{" "}
            <p className="underline">{picData?.tags?.map((tag) => tag.name)}</p>
          </h2>
          <h2>
            License:<p>Burst Some Rights Reserved</p>
          </h2>
        </div>
        <div className="w-3/4 flex justify-center items-center">
          <img className="w-3/4 h-3/4" src={picData.src} alt="img1" />
        </div>
      </div>
    </div>
  );
};

export default DetailPicture;
