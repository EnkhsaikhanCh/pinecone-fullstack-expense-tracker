import React from "react";
import axios from "axios";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const API_BASE_URL = `http://localhost:3000/categories`;
const CREATE_ENDPOINT = `create`;

export function AddCategoryButton({ onComplete }) {
  const [name, setName] = useState("");

  function createCategory() {
    axios
      .post(`${API_BASE_URL}/${CREATE_ENDPOINT}`, {
        name: name,
      })
      .then(() => {
        closeModal();
        onComplete();
        setName("");
      });
  }

  const openModal = () => {
    document.getElementById("my_modal_3").showModal();
  };

  const closeModal = () => {
    document.getElementById("my_modal_3").close();
  };
  return (
    <>
      <button className="btn btn-sm mt-2" onClick={openModal}>
        <FaPlus />
        Add Category
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">Add Record</h2>
            <button className="btn btn-sm" onClick={closeModal}>
              ✕
            </button>
          </div>
          {/* Name */}
          <label className="input input-bordered flex w-full  items-center gap-2 bg-[#F3F4F6]">
            <div>
              <p className="text-sm text-[#808080]">Name</p>
            </div>
            <input
              type="text"
              className="grow"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn" onClick={createCategory}>
                Add Category
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
