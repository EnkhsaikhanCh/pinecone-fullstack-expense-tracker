import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    // title: {
    //   display: true,
    //     text: "Expenses tracker 2024",
    // },
    legend: {
      display: false,
    },
  },
};

export function PinChart() {
  return (
    <div className="card card-side w-1/2 items-center bg-base-100 shadow-sm">
      <div className="card-body px-0 pb-5 pt-4">
        <div className="flex items-center justify-between border-b-[1px] px-8 pb-2">
          <h1 className="card-title">Income - Expense</h1>
          <span className="text-[#6B7280]">Jun 1 - Nov 30</span>
        </div>
        <div className="flex w-full justify-center px-8 pb-2">
          <div style={{ width: "260px", height: "260px", display: "flex" }}>
            <Doughnut data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}
