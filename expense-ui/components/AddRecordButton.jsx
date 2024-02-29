// import axios from "axios";
import axios from "axios";

import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";

const API_BASE_URL = `http://localhost:3000/transactions`;
const CREATE_ENDPOINT = `create`;
// const UPDATE_ENDPOINT = `update`;
// const DELETE_ENDPOINT = `delete`;

function refreshPage() {
  window.location.reload(false);
}

export function AddRecordButton() {
  const [transactions, setTransactions] = useState([]);

  function loadTransactions() {
    axios.get(`${API_BASE_URL}`).then(
      (response) => {
        setTransactions(response.data);
      },
      (error) => {
        console.error("Error loading task:", error.message);
      },
    );
  }

  function createTransaction() {
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;

    console.log({ title, amount, description });

    if (title && amount && description) {
      axios
        .post(`${API_BASE_URL}/${CREATE_ENDPOINT}`, {
          title,
          amount,
          description,
        })
        .then(() => {
          loadTransactions();
          refreshPage();
        });
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        <IoAddOutline />
        Add record
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Title"
              id="title"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Amount"
              id="amount"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="form-control">
              <div className="label">
                <span className="label-text">Note</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                id="description"
                placeholder="Write here"
              ></textarea>
            </label>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={createTransaction}>
                Done
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
