import { Card } from "@/components/Card";
import { FilterSection } from "@/components/FilterSection";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-4 flex w-fit">
        <FilterSection />
        <Card />
      </div>
    </div>
  );
}
