import axios from "axios";
import useSWR, { mutate } from "swr"; // Ensure mutate is imported correctly
import { GrHomeRounded } from "react-icons/gr";
import { PiTrashDuotone } from "react-icons/pi";
import dayjs from "dayjs";
import { Fetcher } from "@/pages/util";

const API_BASE_URL = `http://localhost:3000/transactions`;
const DELETE_ENDPOINT = `delete`;

export function Card() {
  const { data: transactions, error } = useSWR("transactions", Fetcher);
  const isLoading = !transactions && !error;

  function deleteTransaction(transaction_id) {
    if (window.confirm("Delete?")) {
      axios
        .delete(`${API_BASE_URL}/${DELETE_ENDPOINT}/${transaction_id}`)
        .then(() => {
          mutate(API_BASE_URL);
        });
    }
  }

  function parseAmount(amountString) {
    const numericValue = Number(amountString.replace(/[^0-9.-]+/g, ""));
    return numericValue;
  }

  function getAmountClassName(amount) {
    const amountNumber = parseAmount(amount);
    return amountNumber < 0
      ? "rounded-md border border-red-300 bg-rose-100 px-3 font-semibold"
      : "rounded-md border border-emerald-300 bg-emerald-100 px-3 font-semibold";
  }

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (error) {
    return <div>Error loading transactions.</div>;
  }

  if (Array.isArray(transactions) && transactions.length === 0) {
    return <div>No transactions found.</div>;
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between gap-3 place-self-start md:flex-row lg:w-[1000px]">
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
                <span className={getAmountClassName(transaction.amount)}>
                  {transaction.amount}
                </span>

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
  return <p className="text-sm text-[#6B7280]">{date}</p>;
}

function CardSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="skeleton h-[80px] w-full rounded-md"></div>
        <div className="skeleton h-[80px] w-full rounded-md"></div>
        <div className="skeleton h-[80px] w-full rounded-md"></div>
      </div>
    </>
  );
}
