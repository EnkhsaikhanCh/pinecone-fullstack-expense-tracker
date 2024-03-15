import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  elements: {
    bar: {
      borderWidth: 1.5,
    },
  },
  plugins: {
    labels: {
      display: false,
    },
  },
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

const labels = ["March", "April", "May", "June", "July", "August", "September"];

const income = [100, 80, 100, 123, 100, 123, 100];
const expanse = [50, 20, 70, 30, 10, 60, 40];

export const data = {
  labels,
  datasets: [
    {
      label: "Income",
      data: income,
      borderColor: "rgba(112, 231, 183)",
      backgroundColor: "rgba(209, 250, 229)",
      borderRadius: 3,
      stack: "Stack 1",
    },
    {
      label: "Expanse",
      data: expanse,
      borderColor: "#FDA5A5",
      backgroundColor: "rgba(255, 228, 230)",
      borderRadius: 3,
      stack: "Stack 0",
    },
  ],
};

export function BarChart() {
  return (
    <div className="card card-side w-1/2 items-center bg-base-100 shadow-sm">
      <div className="card-body px-0 pb-5 pt-4">
        <div className="border-b-[1px] px-8 pb-2">
          <h1 className="card-title">Income - Expense</h1>
        </div>
        <div className="flex w-full justify-center px-8 pb-2">
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
