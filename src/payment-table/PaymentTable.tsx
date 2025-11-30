import React, { useMemo, useState } from "react";
import {
  buildPaymentMatrix,
  getUniqueOptions,
  sumAmountMatrix,
} from "@/payment-table/utils";
import type { PaymentRowViewModel } from "@/payment-table/types";
import {
  paymentsMock,
  consumptionsMock,
  paymentBreakdownsMock,
} from "@/payment-table/mockdata";
import { PaymentHeader } from "@/payment-table/components/PaymentHeader";
import { SearchRow } from "@/payment-table/components/SearchRow";
import { DataRow } from "@/payment-table/components/DataRow";
import { TotalsRow } from "@/payment-table/components/TotalsRow";
import { groupBy } from "lodash";
import { Payment } from "./components/Payment";

interface FilterState {
  styleNumber: string;
  supplierItemCode: string;
  fabricName: string;
  fabricColor: string;
}

const initialFilterState: FilterState = {
  styleNumber: "all",
  supplierItemCode: "all",
  fabricName: "all",
  fabricColor: "all",
};

export const PaymentTable: React.FC = () => {
  const { rows: allRows, sortedPayments } = useMemo(() => {
    return buildPaymentMatrix({
      payments: paymentsMock,
      consumptions: consumptionsMock,
      paymentBreakdowns: paymentBreakdownsMock,
    });
  }, []);

  const [showSearch, setShowSearch] = useState(false);
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredRows = useMemo(
    () =>
      allRows.filter((row) => {
        if (
          filters.styleNumber !== "all" &&
          row.styleNumber !== filters.styleNumber
        )
          return false;
        if (
          filters.supplierItemCode !== "all" &&
          row.supplierItemCode !== filters.supplierItemCode
        )
          return false;
        if (
          filters.fabricName !== "all" &&
          row.fabricName !== filters.fabricName
        )
          return false;
        if (
          filters.fabricColor !== "all" &&
          row.fabricColor !== filters.fabricColor
        )
          return false;
        return true;
      }),
    [allRows, filters]
  );

  const totals = useMemo(() => {
    return sumAmountMatrix(filteredRows, sortedPayments);
  }, [filteredRows, sortedPayments]);

  const styleOptions = getUniqueOptions(allRows, "styleNumber");
  const supplierOptions = getUniqueOptions(allRows, "supplierItemCode");
  const fabricNameOptions = getUniqueOptions(allRows, "fabricName");
  const fabricColorOptions = getUniqueOptions(allRows, "fabricColor");

  return (
    <div className="w-full bg-slate-50 p-8">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Payment Table
      </h2>

      <PaymentHeader
        showSearch={showSearch}
        onToggleSearch={() => setShowSearch((prev) => !prev)}
      />

      <div className="border border-slate-200 overflow-x-auto max-w-7xl bg-white">
        <table className="w-full border-collapse text-xs text-slate-800">
          <thead>
            <tr className="bg-slate-100 text-[11px]">
              <th
                className="border-b border-slate-200 px-3 py-2 text-left border-r-4"
                colSpan={8}
              >
                Ordered
              </th>
              {sortedPayments.map((p, idx) => (
                <th
                  key={p.id}
                  className="border-b border-slate-200 bg-white text-left "
                  colSpan={3}
                >
                  <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 h-8">
                    {idx === 0 ? "Payable" : " "}
                  </div>
                  <Payment payment={p} />
                </th>
              ))}
            </tr>
            <tr className="bg-slate-100 text-[11px]">
              <th className="border-b border-slate-200 px-3 py-2 text-left min-w-30">
                Style No.
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-left min-w-20">
                Supplier Item #
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-left min-w-20">
                Fabric Name
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-left min-w-20">
                Fabric Color
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-right">
                Order Qty
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-left">
                Unit
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-right">
                U/price
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-right border-r-4">
                Amount
              </th>
              {sortedPayments.map((p) => (
                <React.Fragment key={p.id}>
                  <th className="border-b border-t border-l border-slate-200 px-3 py-2 text-right">
                    Shipped Qty
                  </th>
                  <th className="border-b border-t border-slate-200 px-3 py-2 text-right">
                    U/price
                  </th>
                  <th className="border-b border-t border-slate-200 px-3 py-2 text-right">
                    Amount
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody>
            <SearchRow
              show={showSearch}
              filters={filters}
              options={{
                styleNumbers: styleOptions,
                supplierItemCodes: supplierOptions,
                fabricNames: fabricNameOptions,
                fabricColors: fabricColorOptions,
              }}
              onChange={handleFilterChange}
              payments={sortedPayments}
            />

            {Object.entries(groupBy(filteredRows, "salesOrderId")).map(
              ([salesOrderId, rows]) => {
                const groupRows = rows as PaymentRowViewModel[];
                const groupTotals = sumAmountMatrix(groupRows, sortedPayments);

                return (
                  <React.Fragment key={salesOrderId}>
                    {/** 그룹의 실제 데이터 row들 */}
                    {groupRows.map((row) => (
                      <DataRow
                        key={row.consumptionId}
                        row={row}
                        payments={sortedPayments}
                      />
                    ))}

                    {/** 그룹별 Sub.TTL */}
                    <TotalsRow
                      label="Sub.TTL"
                      orderTotals={groupTotals.orderTotals}
                      paymentTotals={groupTotals.paymentTotals}
                      payments={sortedPayments}
                    />
                  </React.Fragment>
                );
              }
            )}

            <TotalsRow
              label="G.TTL"
              orderTotals={totals.orderTotals}
              paymentTotals={totals.paymentTotals}
              payments={sortedPayments}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};
