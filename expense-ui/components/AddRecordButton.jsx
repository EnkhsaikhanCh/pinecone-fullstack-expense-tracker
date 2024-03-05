import axios from "axios";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { CategorySelect } from "./CategorySelect";

const API_BASE_URL = `http://localhost:3000/transactions`;
const CREATE_ENDPOINT = `create`;

export function AddRecordButton({ onComplete }) {
  const [amount, setAmount] = useState("");
  const [category_id, setCategory_id] = useState("");

  function createTransaction() {
    axios
      .post(`${API_BASE_URL}/${CREATE_ENDPOINT}`, {
        category_id: category_id,
        amount: amount,
      })
      .then(() => {
        closeModal();
        onComplete();
        setAmount("");
        setCategory_id("");
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
        <div className="modal-box">
          <h2 className="mb-3 text-xl font-bold">Add Record</h2>

          <div className="flex flex-col gap-2">
            <CategorySelect onSelectChange={(catId) => setCategory_id(catId)} />

            {/* Amount */}
            <label className="input input-bordered flex w-full max-w-xs items-center gap-2">
              Amount
              <input
                type="number"
                className="grow"
                placeholder="₮ 000.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          </div>

          {/* Buttons */}
          <ModalButtons
            createTransaction={createTransaction}
            closeModal={closeModal}
          />
        </div>
      </dialog>
    </div>
  );
}

function ModalButtons({ createTransaction, closeModal }) {
  return (
    <div className="modal-action">
      <form method="dialog" className="flex gap-2">
        <button className="btn" onClick={createTransaction}>
          Done
        </button>
        <button className="btn" onClick={closeModal}>
          Close
        </button>
      </form>
    </div>
  );
}
