import { LogoSVG } from "../image/LogoSVG";
import { ChipSVG } from "../image/ChipSVG";

export function CashWidget() {
  return (
    <div className="card h-[200px] w-[384px] bg-neutral text-white">
      <div className="card-body flex justify-between">
        <div className="flex gap-2">
          <LogoSVG />
          <h2 className="card-title">Gelt</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400">Cash</p>
            <p className="text-2xl">10,000</p>
          </div>
          <div>
            <ChipSVG />
          </div>
        </div>
      </div>
    </div>
  );
}
