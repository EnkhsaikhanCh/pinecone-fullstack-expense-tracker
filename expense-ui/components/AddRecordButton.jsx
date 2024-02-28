import { IoAddOutline } from "react-icons/io5";

export function AddRecordButton() {
  function addRecord() {
    alert("Hello");
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={addRecord}>
        <IoAddOutline />
        Add
      </button>
    </div>
  );
}
