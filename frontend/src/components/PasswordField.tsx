import { BiSolidHide, BiSolidShow } from "react-icons/bi";

export function PasswordField({
  label,
  visible,
  value,
  onChange,
  toggleVisibility,
}: {
  label: string;
  visible: boolean;
  value: string;
  onChange: (newValue: string) => void;
  toggleVisibility: () => void;
}) {
  return (
    <label htmlFor="" className="form-control gap-1">
      <span className="label-text font-bold">{label}</span>
      <div className="relative w-full max-w-xs">
        <input
          type={visible ? "text" : "password"}
          className="input input-sm input-bordered w-full rounded-md bg-[#F5F5F5] pr-10"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
        />
        <button
          onClick={toggleVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <BiSolidHide size={15} /> : <BiSolidShow size={15} />}
        </button>
      </div>
    </label>
  );
}
