import { Header } from "@/components/Header";
import { CashWidget } from "@/components/widgets/CashWidget";
import { ExpenseWidget } from "@/components/widgets/ExpenseWidget";
import { IncomeWidget } from "@/components/widgets/IncomeWidget";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="container mx-auto mt-5 flex justify-center">
        <div className="flex gap-5">
          <CashWidget />
          <IncomeWidget />
          <ExpenseWidget />
        </div>
      </div>
    </main>
  );
}
