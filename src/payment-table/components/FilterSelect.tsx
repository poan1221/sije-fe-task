interface FilterSelectProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export const FilterSelect = ({
  value,
  options,
  onChange,
}: FilterSelectProps) => {
  return (
    <select
      className="w-full border border-slate-200 bg-white px-2 py-1 text-xs rounded-md"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">All</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};
