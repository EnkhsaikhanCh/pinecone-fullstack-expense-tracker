import axios from "axios";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";

const API_BASE_URL = `http://localhost:3000/transactions`;
const CREATE_ENDPOINT = `create`;

export function AddRecordButton() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
  });

  // Function to load transactions from the server
  async function loadTransactions() {
    try {
      const response = await axios.get(API_BASE_URL);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error loading transactions:", error.message);
    }
  }

  async function createTransaction() {
    try {
      const { title, amount, description } = formData;
      if (title && amount && description) {
        await axios.post(`${API_BASE_URL}/${CREATE_ENDPOINT}`, {
          title,
          amount,
          description,
        });

        // Clear form data after successful submission
        setFormData({
          title: "",
          amount: "",
          description: "",
        });

        closeModal();
        loadTransactions();
      } else {
        console.error("Invalid input values. Please check your inputs.");
      }
    } catch (error) {
      console.error("Error creating transaction:", error.message);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleInputChange = (input) => {
    setFormData({
      ...formData,
      [input.target.id]: input.target.value,
    });
  };

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
              value={formData.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Amount"
              id="amount"
              className="input input-bordered w-full max-w-xs"
              value={formData.amount}
              onChange={handleInputChange}
            />
            <label className="form-control">
              <div className="label">
                <span className="label-text">Note</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                id="description"
                placeholder="Write here"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </label>
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
