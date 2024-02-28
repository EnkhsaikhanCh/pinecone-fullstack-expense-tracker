import { GrHomeRounded } from "react-icons/gr";
import { Header } from "./Header";
import { AddRecordButton } from "./AddRecordButton";

export function Card() {
  return (
    <>
      <Header />
      <div className="container mx-auto mt-4 flex w-[1000px] flex-row justify-between gap-3">
        <div>
          <FilterSection />
        </div>
        <div className="card w-full bg-neutral">
          <div className="flex justify-between py-4 pr-4">
            <div className="flex">
              <div className="flex w-14 items-center justify-center">
                <GrHomeRounded />
              </div>
              <div>
                <h1 className="text-lg">Lending & Renting</h1>
                <p className="text-sm">14:00</p>
              </div>
            </div>
            <div className="flex items-center text-lg">
              <p>- 1000</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// const AddRecord = () => {
//   function addRecord() {
//     alert("Hello");
//   }

//   return (
//     <div>
//       <button className="btn btn-primary" onClick={addRecord}>
//         <IoAddOutline />
//         Add
//       </button>
//     </div>
//   );
// };

const FilterSection = () => {
  return (
    <div className="card h-full w-[300px] bg-neutral px-4 pt-2">
      <AddRecordButton />
    </div>
  );
};
