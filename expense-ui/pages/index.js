import { Header } from "@/components/Header";
import { BarChart } from "@/components/widgets/BarChart";
import { CashWidget } from "@/components/widgets/CashWidget";
import { ExpenseWidget } from "@/components/widgets/ExpenseWidget";
import { IncomeWidget } from "@/components/widgets/IncomeWidget";
import { PinChart } from "@/components/widgets/PinChart";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="container mx-auto mt-5 flex w-fit flex-col justify-center">
        <div className="flex gap-5">
          <CashWidget />
          <IncomeWidget />
          <ExpenseWidget />
        </div>
        <div className="mt-4 flex justify-between gap-5">
          <BarChart />
          <PinChart />
        </div>
      </div>
    </main>
  );
}
