import React, { useCallback, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { reviewApi } from "../../../api/reviewApi";
import { Line, Pie } from "react-chartjs-2";
import { MenuItem, Select } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Review Line Chart",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const ChartReview = () => {
  const [dataLine, setDataLine] = useState(null);
  const [dataPie, setDataPie] = useState(null);
  const [mode, setMode] = useState("MONTH");

  useEffect(() => {
    getReviews();
  }, [mode]);

  const getReviews = async () => {
    const res = await reviewApi.getGroupByDate(mode);
    const res2 = await reviewApi.getGroupByMood();
    //line
    const data = res.data.records.sort((a, b) => {
      return new Date(a._id) - new Date(b._id);
    });
    const datasets = [
      {
        label: "agv",
        data: data.map((d) => d.avg),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "count",
        data: data.map((d) => d.count),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ];
    setDataLine({ labels: data.map((d) => d._id), datasets });
    //pie
    const data2 = res2.data.sort((a, b) => {
      return a.moodImprovement - b.moodImprovement;
    });
    setDataPie({
      labels: data2.map((t) => t.moodImprovement.toString()),
      datasets: [
        {
          label: "#",
          data: data2.map((t) => t.moodImprovement.toString()),
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(240, 90, 132, 0.2)",
            "rgba(50, 150, 235, 0.2)",
            "rgba(200, 206, 86, 0.2)",
            "rgba(200, 192, 192, 0.2)",
            "rgba(153, 152, 255, 0.2)",
            "rgba(255, 140, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(100, 206, 86, 0.2)",
            "rgba(200, 155, 192, 0.2)",
            "rgba(153, 255, 255, 0.2)",
            "rgba(255, 140, 100, 0.2)",
            "rgba(255, 99, 50, 0.2)",
            "rgba(54, 162, 50, 0.2)",
            "rgba(255, 206, 200, 0.2)",
            "rgba(75, 192, 150, 0.2)",
            "rgba(153, 102, 100, 0.2)",
          ],
        },
      ],
    });
  };

  return (
    <div className="p-4">
      <div className=" shadow p-4 flex justify-between items-center">
        <p className=" text-xl font-semibold">Reviews Management</p>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="p-1 shadow">
          <Select
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
            }}
          >
            <MenuItem value={"YEAR"}>Year</MenuItem>
            <MenuItem value={"MONTH"}>Month</MenuItem>
          </Select>
          <div className="px-20">
            {dataLine && <Line options={options} data={dataLine} />}
          </div>
        </div>
        <div className="flex justify-center max-h-screen shadow">
          <div className="max-h-screen w-1/2">
            {dataPie && (
              <Pie
                data={dataPie}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Review Pie Chart - Points Improve Emotions",
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartReview;
