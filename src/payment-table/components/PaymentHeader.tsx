interface PaymentHeaderProps {
  showSearch: boolean;
  onToggleSearch: () => void;
}

export const PaymentHeader = ({
  showSearch,
  onToggleSearch,
}: PaymentHeaderProps) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <button
        type="button"
        onClick={onToggleSearch}
        className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100"
      >
        {showSearch ? "Hide Search" : "Show Search"}
      </button>
    </div>
  );
};
