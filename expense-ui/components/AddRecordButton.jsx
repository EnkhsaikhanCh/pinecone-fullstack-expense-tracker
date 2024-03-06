import axios from "axios";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { CategorySelect } from "./CategorySelect";
import { PayeeSelect } from "./PayeeSelect";

const API_BASE_URL = `http://localhost:3000/transactions`;
const CREATE_ENDPOINT = `create`;

export function AddRecordButton({ onComplete }) {
  const [amount, setAmount] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [date, setDate] = useState("");

  function createTransaction() {
    axios
      .post(`${API_BASE_URL}/${CREATE_ENDPOINT}`, {
        category_id: category_id,
        amount: amount,
        date: date,
      })
      .then(() => {
        closeModal();
        onComplete();
        setAmount("");
        setCategory_id("");
        setDate("");
      });
  }

  const openModal = () => {
    document.getElementById("my_modal_1").showModal();
  };

  const closeModal = () => {
    document.getElementById("my_modal_1").close();
  };

  return (
    <div>
      <button className="btn" onClick={openModal}>
        <IoAddOutline />
        Add record
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Add Record</h2>
            <button className="btn btn-sm" onClick={closeModal}>
              ✕
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
                    type="number"
                    className="grow"
                    placeholder="₮ 000.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </label>
                <CategorySelect
                  onSelectChange={(catId) => setCategory_id(catId)}
                />
                <div className="flex gap-1">
                  <label className="form-control w-full max-w-xs ">
                    <div className="label">
                      <span className="label-text text-[#808080]">Date</span>
                    </div>
                    <input
                      type="datetime-local"
                      value={date}
                      className="input input-bordered w-full max-w-xs bg-[#F3F4F6]"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
            {/* part 2 */}
            <div>
              <PayeeSelect />
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-[#808080]">Note</span>
                </div>
                <textarea
                  name=""
                  id=""
                  cols="40"
                  rows="6"
                  placeholder="Write here"
                  className="textarea textarea-bordered w-full resize-none rounded-md bg-[#F3F4F6] p-2"
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
          className="btn btn-primary md:btn-wide"
          onClick={createTransaction}
        >
          Add record
        </button>
      </form>
    </div>
  );
}
