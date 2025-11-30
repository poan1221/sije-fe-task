import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface SearchSelectProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export const SearchSelect = ({
  value,
  options,
  onChange,
}: SearchSelectProps) => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const label = value === "all" ? `All` : value;

  const filteredOptions = useMemo(
    () =>
      options.filter((opt) =>
        opt.toLowerCase().includes(keyword.toLowerCase())
      ),
    [options, keyword]
  );

  // 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setKeyword("");
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setOpen(false);
    setKeyword("");
  };

  return (
    <div className="relative text-xs" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-white px-2 py-1 text-left hover:bg-slate-50"
      >
        <span className="truncate">{label}</span>
        <span className="ml-1 text-slate-500">
          <ChevronDown size={12} />
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-[110%] z-20 w-30 rounded-md border border-slate-200 bg-white shadow-lg">
          {/* 검색 인풋 */}
          <div className="px-2 pt-1.5 pb-1">
            <div className="flex items-center rounded border border-slate-200 px-2">
              <Search size={14} />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="search..."
                className="w-full pl-2 py-1 text-[11px] focus:border-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* 옵션 목록 */}
          <div className="max-h-48 overflow-y-auto py-1 text-[11px]">
            <button
              type="button"
              onClick={() => handleSelect("all")}
              className={`flex w-full items-center px-3 py-1.5 text-left hover:bg-slate-50 ${
                value === "all" ? "bg-slate-100 font-semibold" : ""
              }`}
            >
              All
            </button>

            {/* 검색 옵션 없을 시 */}
            {filteredOptions.length === 0 && (
              <div className="px-3 py-2 text-slate-400">No results</div>
            )}

            {filteredOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`flex w-full items-center px-3 py-1.5 text-left hover:bg-slate-50 ${
                  value === opt ? "bg-slate-100 font-semibold" : ""
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
