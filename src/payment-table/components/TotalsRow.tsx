import type { Payment } from "@/payment-table/types";
import React from "react";

interface TotalsRowProps {
  label?: string;
  orderTotals: {
    orderQuantity: number;
    orderAmount: number;
  };
  paymentTotals: {
    shippedQuantity: number;
    shippedAmount: number;
  }[];
  payments: Payment[];
}

export const TotalsRow = ({
  label = "G.TTL",
  orderTotals,
  paymentTotals,
  payments,
}: TotalsRowProps) => {
  return (
    <tr className="bg-slate-50 font-bold">
      <td
        className="border-r border-slate-100 px-3 py-2 text-right"
        colSpan={7}
      >
        {label}
      </td>
      <td className="border-r-4 border-slate-100 px-3 py-2 text-right">
        <div className="flex justify-between">
          <span>$</span>
          <span>{orderTotals.orderAmount.toFixed(2).toLocaleString()}</span>
        </div>
      </td>
      {payments.map((p, idx) => (
        <React.Fragment key={p.id}>
          <td className="border-r border-slate-100 px-3 py-2 text-right">
            {paymentTotals[idx].shippedQuantity.toLocaleString()}
          </td>
          <td className="border-r border-slate-100 px-3 py-2" />
          <td className="border-r border-slate-100 px-3 py-2 text-right">
            <div className="flex justify-between">
              <span>$</span>
              <span>
                {paymentTotals[idx].shippedAmount.toFixed(2).toLocaleString()}
              </span>
            </div>
          </td>
        </React.Fragment>
      ))}
    </tr>
  );
};
