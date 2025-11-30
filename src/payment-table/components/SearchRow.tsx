import { FilterSelect } from "@/payment-table/components/FilterSelect";
import type { Payment } from "@/payment-table/types";
import React from "react";

interface SearchRowProps {
  show: boolean;
  filters: {
    styleNumber: string;
    supplierItemCode: string;
    fabricName: string;
    fabricColor: string;
  };
  options: {
    styleNumbers: string[];
    supplierItemCodes: string[];
    fabricNames: string[];
    fabricColors: string[];
  };
  onChange: (key: keyof SearchRowProps["filters"], value: string) => void;
  payments: Payment[];
}

export const SearchRow = ({
  show,
  filters,
  options,
  onChange,
  payments,
}: SearchRowProps) => {
  if (!show) return null;

  return (
    <tr className="bg-slate-50 border-b border-slate-200">
      <td className="px-3 py-2">
        <FilterSelect
          value={filters.styleNumber}
          options={options.styleNumbers}
          onChange={(v) => onChange("styleNumber", v)}
        />
      </td>
      <td className="px-3 py-2"></td>
      <td className="px-3 py-2">
        <FilterSelect
          value={filters.fabricName}
          options={options.fabricNames}
          onChange={(v) => onChange("fabricName", v)}
        />
      </td>
      <td className="px-3 py-2">
        <FilterSelect
          value={filters.fabricColor}
          options={options.fabricColors}
          onChange={(v) => onChange("fabricColor", v)}
        />
      </td>
      {/* 나머지 컬럼은 검색 없음 */}
      <td className="px-3 py-2" />
      <td className="px-3 py-2" />
      <td className="px-3 py-2" />
      <td className="px-3 py-2" />

      {payments.map((p) => (
        <React.Fragment key={p.id}>
          <td className="px-3 py-2" />
          <td className="px-3 py-2" />
          <td className="px-3 py-2" />
        </React.Fragment>
      ))}
    </tr>
  );
};
