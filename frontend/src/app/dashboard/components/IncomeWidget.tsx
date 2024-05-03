"use client";

import { useEffect, useState } from "react";
import { Fetcher } from "@/app/utils";
import { DotSVG } from "@/components/image/DotSVG";
import { VectorSVG } from "@/components/image/VectorSVG";

interface incomeSumType {
  incomeSum: number;
}

export function IncomeWidget() {
  const [totalAmount, setTotalAmount] = useState<incomeSumType | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getTotalAmount() {
    try {
      const response = await Fetcher("transactions/totalAmount");
      console.log(response);
      setTotalAmount(response);
    } catch {
      console.error("Failed to fetch total amount:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTotalAmount();
  }, []);

  function formatCurrency(value: number) {
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
      <div className="card-body flex justify-between px-0 pb-5 pt-4">
        <div className="flex items-center gap-2 border-b-[1px] px-8 pb-2">
          <DotSVG />
          <h2 className="card-title">Your Income</h2>
        </div>
        <div className="flex h-[120px] flex-col justify-between gap-4 px-8 pt-2">
          <div>
            {isLoading ? (
              <div className="flex h-[38px] w-[70px] items-center justify-center rounded-md border border-emerald-300 bg-emerald-100 px-3 font-semibold">
                <span className="loading loading-spinner loading-sm"></span>
              </div>
            ) : error ? (
              <span className="text-red-500">Error fetching data</span>
            ) : totalAmount ? (
              <span className="rounded-md border border-emerald-300 bg-emerald-100 px-3 text-3xl font-semibold">
                {formatCurrency(totalAmount.incomeSum)}
              </span>
            ) : null}

            <p className="mt-1 text-lg text-gray-400">Your Income Amount</p>
          </div>
          <div className="flex items-center gap-2">
            <VectorSVG />
            <p>32% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
