import axios from "axios";
import { GrHomeRounded } from "react-icons/gr";
import { Header } from "./Header";
import { AddRecordButton } from "./AddRecordButton";
import { useEffect, useState } from "react";
import { PiTrashDuotone } from "react-icons/pi";

const API_BASE_URL = `http://localhost:3000/transactions`;
const DELETE_ENDPOINT = `delete`;

export function Card() {
  const [transactions, setTransactions] = useState([]);

  async function loadTransactions() {
    try {
      const response = await axios.get(API_BASE_URL);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error loading transactions", error.message);
    }
  }

  // Read ---------------------------------------------
  useEffect(() => {
    loadTransactions();
  }, []);

  // Delete ---------------------------------------------
  function deleteTransaction(transaction_id) {
    if (window.confirm("Delete?")) {
      axios
        .delete(`${API_BASE_URL}/${DELETE_ENDPOINT}/${transaction_id}`)
        .then(() => {
          loadTransactions();
        });
    }
  }

  return (
    <>
      <Header />
      <div className="container mx-auto mt-4 flex flex-row justify-between gap-3 lg:w-[1000px]">
        <div className="card h-full w-[300px] rounded-md bg-neutral px-4 py-2">
          <AddRecordButton onComplete={loadTransactions} />
        </div>
        <div className="card flex w-full gap-2 ">
          {transactions.map((transaction) => (
            <div
              key={transaction.transaction_id}
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
                <button
                  className="btn h-[48px] w-[48px] px-[10px]"
                  onClick={() => deleteTransaction(transaction.transaction_id)}
                >
                  <PiTrashDuotone className="h-[20px] w-[20px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
