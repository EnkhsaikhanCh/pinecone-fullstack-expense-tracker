import axios from "axios";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";

const API_BASE_URL = `http://localhost:3000/transactions`;
const CREATE_ENDPOINT = `create`;

export function AddRecordButton({ onComplete }) {
  // const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category_id, setCategory_id] = useState("");
  // const [description, setDescription] = useState("");

  function createTransaction() {
    axios
      .post(`${API_BASE_URL}/${CREATE_ENDPOINT}`, {
        title: category_id,
        amount: amount,
        // description: description,
      })
      .then(() => {
        closeModal();
        onComplete();
        setAmount("");
        setCategory_id("");
        // setDescription("");
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
            {/* Category */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select
                className="select select-bordered"
                value={category_id}
                onChange={(e) => setCategory_id(e.target.value)}
              >
                <option value="">...</option>
                <option>Food & Drinks</option>
                <option>Lending & Renting</option>
                <option>Shopping</option>
                <option>Invest</option>
                <option>Other</option>
              </select>
            </label>

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

            {/* Description */}
            {/* <label className="form-control">
              <div className="label">
                <span className="label-text">Note</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                id="description"
                placeholder="Write here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label> */}
          </div>
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
        </div>
      </dialog>
    </div>
  );
}
