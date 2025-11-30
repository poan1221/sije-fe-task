import type { Payment } from "@/payment-table/types";
import { formatDate } from "@/payment-table/utils";

interface PaymentProps {
  payment: Payment;
}

export function Payment({ payment }: PaymentProps) {
  return (
    <>
      <div className="grid grid-cols-[120px_1fr] gap-x-4 text-sm items-center font-medium text-[11px] border-r-2 border-slate-200">
        <div className="font-semibold text-slate-900 bg-slate-100 border-r border-slate-200 px-3 py-2">
          Payment Due
        </div>
        <div className="text-[11px]">{formatDate(payment.paymentDueDate)}</div>

        <div className="font-semibold text-slate-900 bg-slate-100 border-r border-slate-200 px-3 py-2">
          Payment Date
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px]">{formatDate(payment.paidAt)}</span>
          {payment.paidAt && (
            <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded text-xs font-medium">
              Paid
            </span>
          )}
        </div>

        <div className="font-semibold text-slate-900 bg-slate-100 border-r border-slate-200 px-3 py-2">
          Attachment
        </div>
        <div>
          {payment.sourcingFiles.map((p) => (
            <div className="truncate rounded border bg-slate-100 border-r border-slate-200 px-2 py-1 text-xs">
              {p}
            </div>
          ))}
        </div>

        <div className="font-semibold text-slate-900 bg-slate-100 border-r border-slate-200 px-3 py-2">
          Memo
        </div>
        <div className="text-slate-700 text-[11px] truncate">
          {payment.memo}
        </div>
      </div>
    </>
  );
}
