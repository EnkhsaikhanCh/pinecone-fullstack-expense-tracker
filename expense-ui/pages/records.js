import { Card } from "@/components/Card";
import { FilterSection } from "@/components/FilterSection";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-4 flex flex-col justify-between gap-2 px-4 md:flex-row lg:w-[1000px]">
        <FilterSection />
        <Card />
      </div>
    </div>
  );
}
