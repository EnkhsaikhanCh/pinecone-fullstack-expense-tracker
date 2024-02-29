import axios from "axios";

import { GrHomeRounded } from "react-icons/gr";
import { Header } from "./Header";
import { AddRecordButton } from "./AddRecordButton";
import { useEffect, useState } from "react";

const API_BASE_URL = `http://localhost:3000/transactions`;
// const CREATE_ENDPOINT = `create`;
// const UPDATE_ENDPOINT = `update`;
// const DELETE_ENDPOINT = `delete`;

export function Card() {
  const [transactions, setTransactions] = useState([]);

  function loadTasks() {
    axios.get(`${API_BASE_URL}`).then(
      (response) => {
        setTransactions(response.data);
      },
      (error) => {
        console.error("Error loading task:", error.message);
      },
    );
  }

  // Read ---------------------------------------------
  useEffect(() => {
    loadTasks();
  }, []);

  // Create ---------------------------------------------
  function createTransaction() {
    const title = document.getElementById("title");
    const amount = document.getElementById("amount");
    const description = document.getElementById("description");

    if ((title, amount, description)) {
      axios
        .post(`${API_BASE_URL}/${CREATE_ENDPOINT}`, {
          title,
        })
        .then(() => {
          loadTasks();
        });
    }
  }

  return (
    <>
      <Header />
      <div className="container mx-auto mt-4 flex w-[1000px] flex-row justify-between gap-3">
        <div>
          <FilterSection />
        </div>
        <div className="card flex w-full gap-2 ">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between rounded-md bg-neutral py-4 pr-4"
            >
              <div className="flex">
                <div className="flex w-14 items-center justify-center">
                  <GrHomeRounded />
                </div>
                <div>
                  <h1 className="text-lg">{transaction.title}</h1>
                  <p className="text-sm">{transaction.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <p>{transaction.amount}</p>
                <button className="btn">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const FilterSection = () => {
  return (
    <div className="card h-full w-[300px] rounded-md bg-neutral px-4 pt-2">
      <AddRecordButton />
    </div>
  );
};