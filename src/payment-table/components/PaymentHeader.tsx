import { cn } from "@/utils/cn";
import { Search } from "lucide-react";

interface PaymentHeaderProps {
  showSearch: boolean;
  onToggleSearch: () => void;
}

export const PaymentHeader = ({
  showSearch,
  onToggleSearch,
}: PaymentHeaderProps) => {
  return (
    <div className="mb-4 flex items-center gap-4">
      <h2 className="text-lg font-semibold text-slate-800">Payment Table</h2>

      {/* 검색 토글 */}
      <button
        type="button"
        onClick={onToggleSearch}
        className={cn(
          "relative inline-flex h-6 w-12 items-center rounded-full transition-colors",
          showSearch ? "bg-slate-700" : "bg-slate-300"
        )}
      >
        <span
          className={cn(
            "absolute flex h-5 w-5 items-center justify-center rounded-full bg-white shadow transition-transform",
            "duration-300",
            showSearch ? "translate-x-6" : "translate-x-1"
          )}
        >
          <Search size={14} />
        </span>
      </button>
    </div>
  );
};
