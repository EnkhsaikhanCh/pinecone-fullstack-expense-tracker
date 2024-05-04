"use client";

import { useEffect } from "react";
import { Deleter, useTransactions } from "@/app/utils";
import axios from "axios";
import { TransactionSkeleton } from "./TransactionSkeleton";
import { TransactionCard } from "./TransactionCard";
import { Toaster, toast } from "sonner";

export function TransactionList() {
  const { transactions, loadTransactions, isLoading, error } =
    useTransactions();

  useEffect(() => {
    loadTransactions();
  }, []);

  async function deleteTransaction(transaction_id: string) {
    if (window.confirm("Delete?")) {
      try {
        await Deleter(`transactions/delete/${transaction_id}`);
        toast.success("Transaction successfully deleted");
        loadTransactions();
      } catch (error) {
        console.error("Failed to delete transaction", error);
      }
    }
  }

  if (error) {
    return <div>Error loading transactions.</div>;
  }

  if (isLoading) {
    return <TransactionSkeleton />;
  }

  if (transactions === null) {
    return <TransactionSkeleton />;
  }

  if (transactions.length === 0) {
    return (
      <div className="mt-3 text-center font-semibold text-gray-500 md:w-[1000px]">
        No transactions found.
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between gap-3 place-self-start md:flex-row lg:w-[1000px]">
        <Toaster position="bottom-right" richColors />

        <div className="card flex w-full gap-2 ">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onDelete={deleteTransaction}
            />
          ))}
        </div>
      </div>
    </>
  );
}
