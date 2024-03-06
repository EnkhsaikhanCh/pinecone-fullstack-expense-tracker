import Select from "react-select";

export function PayeeSelect() {
  return (
    <label>
      <div className="label">
        <span className="label-text text-[#808080]">Payee</span>
      </div>
      <Select className="basic-single" classNamePrefix="select" name="color" />
    </label>
  );
}
