import axios from "axios";
import { useEffect, useState } from "react";
import { DotSVG } from "../image/DotSVG";
import { DownVectorSVG } from "../image/DownVectorSVG";

export function ExpenseWidget() {
  const [totalAmount, setTotalAmount] = useState(null);

  async function getTotalAmount() {
    const response = await axios.get(
      `http://localhost:3000/transactions/totalAmount`,
    );
    setTotalAmount(response.data);
  }

  useEffect(() => {
    getTotalAmount();
  }, []);

  function formatCurrency(value) {
    if (value === null) return "$0.00";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  return (
    <div className="card h-[200px] w-96 bg-white shadow-sm">
      <div className="card-body flex justify-between  px-0 pb-5 pt-4">
        <div className="flex items-center gap-2 border-b-[1px] px-8 pb-2">
          <DotSVG />
          <h2 className="card-title">Total Expense</h2>
        </div>
        <div className="flex h-[120px] flex-col justify-between gap-4 px-8 pt-2">
          <div>
            {totalAmount !== null && (
              <span className="rounded-md border border-red-300 bg-rose-100 px-3 text-4xl font-semibold">
                {formatCurrency(totalAmount.expenseSum)}
              </span>
            )}

            <p className="mt-1 text-lg text-gray-400">Your Expense Amount</p>
          </div>
          <div className="flex items-center gap-2">
            <DownVectorSVG />
            <p>32% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
