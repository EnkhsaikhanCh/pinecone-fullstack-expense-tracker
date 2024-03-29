import Select from "react-select";

export function PayeeSelect() {
  const colorStyle = {
    control: (styles) => ({ ...styles, backgroundColor: "#F3F4F6" }),
  };
  return (
    <label>
      <div className="label">
        <span className="label-text text-[#808080]">Payee</span>
      </div>
      <Select
        className="basic-single"
        styles={colorStyle}
        classNamePrefix="select"
        name="color"
      />
    </label>
  );
}
