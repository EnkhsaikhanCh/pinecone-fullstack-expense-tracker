import axios from "axios";
import { useState } from "react";
import { CategorySelect } from "./CategorySelect";
import { PayeeSelect } from "./PayeeSelect";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const API_BASE_URL = `http://localhost:3000/transactions`;
const CREATE_ENDPOINT = `create`;

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  const hours = `${now.getHours()}`.padStart(2, "0");
  const minutes = `${now.getMinutes()}`.padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export function AddRecordButton({ onComplete }) {
  const [amount, setAmount] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [dateTime, setDateTime] = useState(getCurrentDateTime());
  const [open, setOpen] = useState(false);
  const [displayAmount, setDisplayAmount] = useState("");

  function createTransaction() {
    axios
      .post(`${API_BASE_URL}/${CREATE_ENDPOINT}`, {
        category_id: category_id,
        amount: amount,
        date: dateTime,
      })
      .then(() => {
        closeModal();
        onComplete();
        setDisplayAmount("");
        setCategory_id("");
        setDateTime(getCurrentDateTime());
      })
      .catch((error) => {
        console.error("Error creating transaction:", error);
      });
  }

  const handleAmountChange = (e) => {
    const numericValue = e.target.value.replace(/,/g, "");

    if (numericValue && !isNaN(numericValue)) {
      const formattedValue = parseFloat(numericValue).toLocaleString();
      setAmount(numericValue);
      setDisplayAmount(formattedValue);
    } else {
      setAmount("");
      setDisplayAmount("");
    }
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        className="btn btn-neutral text-white md:btn-wide"
        onClick={openModal}
      >
        <FaPlus />
        Add record
      </button>
      <dialog id="my_modal_1" className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box w-11/12 max-w-2xl overflow-visible">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Add Record</h2>
            <button className="btn btn-sm w-[30px] p-0" onClick={closeModal}>
              <IoClose />
            </button>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col justify-between md:flex-row">
            {/* Part 1 */}
            <div className="flex flex-col justify-between">
              {/* Select  */}
              <div className="mb-4 grid grid-cols-2 gap-1">
                <button className="btn">Expense</button>
                <button className="btn">Income</button>
              </div>
              <div className="flex flex-col gap-2">
                {/* Amount */}
                <label className="input input-bordered flex w-full  items-center gap-2 bg-[#F3F4F6]">
                  <div>
                    <p className="text-sm text-[#808080]">Amount</p>
                  </div>
                  <input
                    type="text"
                    className="grow"
                    placeholder="₮ 000.00"
                    value={displayAmount}
                    onChange={handleAmountChange}
                  />
                </label>
                <CategorySelect
                  onSelectChange={(catId) => setCategory_id(catId)}
                  open={open}
                />
                <div className="flex gap-1">
                  <label className="form-control w-full max-w-xs ">
                    <div className="label">
                      <span className="label-text text-[#808080]">Date</span>
                    </div>
                    <input
                      type="datetime-local"
                      value={dateTime}
                      className="input input-bordered w-full max-w-xs bg-[#F3F4F6] text-[#808080]"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
            {/* part 2 */}
            <div>
              <PayeeSelect />
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text text-[#808080]">Note</span>
                </div>
                <textarea
                  name=""
                  id=""
                  cols="40"
                  rows="6"
                  placeholder="Write here"
                  className="textarea textarea-bordered w-full resize-none rounded-md bg-[#F3F4F6] p-2 "
                ></textarea>
              </label>
            </div>
          </div>
          {/* Buttons */}
          <ModalButtons createTransaction={createTransaction} />
        </div>
      </dialog>
    </div>
  );
}

function ModalButtons({ createTransaction }) {
  return (
    <div className="modal-action">
      <form method="dialog" className="flex gap-2">
        <button
          className="btn btn-neutral text-white md:btn-wide"
          onClick={createTransaction}
        >
          Add record
        </button>
      </form>
    </div>
  );
}
