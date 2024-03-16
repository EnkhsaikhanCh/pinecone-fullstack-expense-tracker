import axios from "axios";
import { LogoSVG } from "../image/LogoSVG";
import { ChipSVG } from "../image/ChipSVG";
import { useEffect, useState } from "react";

export function CashWidget() {
  const [balance, setBalance] = useState([]);

  async function getNetBalance() {
    try {
      const response = await axios.get(
        `http://localhost:3000/transactions/balance`,
      );
      setBalance(response.data.netBalance);
    } catch (error) {
      console.error("Failed to fetch net balance:", error);
    }
  }

  useEffect(() => {
    getNetBalance();
  }, []);

  return (
    <div className="card h-[200px] w-[384px] bg-neutral text-white shadow-sm">
      <div className="card-body flex justify-between">
        <div className="flex gap-2">
          <LogoSVG />
          <h2 className="card-title">Gelt</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400">Balance</p>
            {balance !== null && <p className="text-2xl">{balance}</p>}
          </div>
          <div>
            <ChipSVG />
          </div>
        </div>
      </div>
    </div>
  );
}
