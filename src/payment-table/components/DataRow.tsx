import type { PaymentRowViewModel, Payment } from "@/payment-table/types";
import React from "react";

interface DataRowProps {
  row: PaymentRowViewModel;
  payments: Payment[];
}

export const DataRow = ({ row, payments }: DataRowProps) => {
  return (
    <tr className="hover:bg-slate-50">
      <td className="border-b border-r border-slate-100 px-3 py-2">
        {row.styleNumber}
      </td>
      <td className="border-b border-r border-slate-100 px-3 py-2">
        {row.supplierItemCode.split("-")[1]}
      </td>
      <td className="border-b border-r border-slate-100 px-3 py-2">
        {row.fabricName}
      </td>
      <td className="border-b border-r border-slate-100 px-3 py-2">
        {row.fabricColor}
      </td>
      <td className="border-b border-r border-slate-100 px-3 py-2 text-right">
        {row.orderQuantity.toLocaleString()}
      </td>
      <td className="border-b border-r border-slate-100 px-3 py-2">
        {row.unit}
      </td>
      <td className="border-b border-r border-slate-100 px-3 py-2 text-right">
        <div className="flex justify-between min-w-20">
          <span>$</span>
          <span>{row.unitPrice.toFixed(5)}</span>
        </div>
      </td>
      <td className="border-b border-r-4 border-slate-100 px-3 py-2 text-right">
        <div className="flex justify-between min-w-20">
          <span>$</span>
          <span>{row.orderAmount.toFixed(2).toLocaleString()}</span>
        </div>
      </td>
      {payments.map((p, idx) => {
        const cell = row.cells[idx];

        return (
          <React.Fragment key={p.id}>
            <td className="border-b border-r  border-slate-100 px-3 py-2 text-right">
              {cell.shippedQuantity
                ? cell.shippedQuantity.toLocaleString()
                : ""}
            </td>
            <td className="border-b border-r border-slate-100 px-3 py-2 text-right">
              {cell.shippedQuantity ? (
                <div className="flex justify-between min-w-20">
                  <span>$</span>
                  <span>
                    {" "}
                    {cell.shippedQuantity.toFixed(5).toLocaleString()}
                  </span>
                </div>
              ) : (
                ""
              )}
            </td>
            <td className="border-b border-r border-slate-100 px-3 py-2 text-right">
              {cell.amount ? (
                <div className="flex justify-between min-w-20">
                  <span>$</span>
                  <span> {cell.amount.toFixed(2).toLocaleString()}</span>
                </div>
              ) : (
                ""
              )}
            </td>
          </React.Fragment>
        );
      })}
    </tr>
  );
};
