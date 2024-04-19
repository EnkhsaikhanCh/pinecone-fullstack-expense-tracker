export function Field({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (newValue: string) => void;
}) {
  return (
    <label className="form-control gap-1">
      <span className="label-text font-bold">{label}</span>
      <input
        type={type}
        className="input input-sm input-bordered w-full max-w-xs rounded-md bg-[#F5F5F5]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      />
    </label>
  );
}
