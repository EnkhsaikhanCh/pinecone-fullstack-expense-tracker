import axios from "axios";
import { GrHomeRounded } from "react-icons/gr";
import { useEffect, useState } from "react";
import { PiTrashDuotone } from "react-icons/pi";
import dayjs from "dayjs";

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
      <div className="flex w-full flex-col items-center justify-between gap-3 md:flex-row lg:w-[1000px]">
        {/* <FilterSection loadTransactions={loadTransactions} /> */}
        <div className="card flex w-full gap-2 ">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between rounded-md bg-white py-4 pr-4"
            >
              <div className="flex">
                <div className="flex w-14 items-center justify-center">
                  <GrHomeRounded />
                </div>
                <div>
                  <h1 className="text-lg">{transaction.category_name}</h1>
                  <Date transaction={transaction} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <p>{transaction.amount}</p>
                <button
                  className="btn h-[48px] w-[48px] px-[10px]"
                  onClick={() => deleteTransaction(transaction.id)}
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

function Date({ transaction }) {
  const date = dayjs(transaction.date).format("HH:mm");
  console.log(date);
  return <p className="text-sm text-[#6B7280]">{date}</p>;
}
