import { chain, groupBy } from "lodash";
import dayjs from "dayjs";
import type {
  Consumption,
  Payment,
  PaymentBreakdown,
  PaymentCell,
  PaymentRowViewModel,
} from "@/payment-table/types";

interface BuildMatrixArgs {
  payments: Payment[];
  consumptions: Consumption[];
  paymentBreakdowns: PaymentBreakdown[];
}

export function buildPaymentMatrix({
  payments,
  consumptions,
  paymentBreakdowns,
}: BuildMatrixArgs): {
  rows: PaymentRowViewModel[];
  sortedPayments: Payment[];
} {
  const sortedPayments = [...payments].sort(
    (a, b) =>
      dayjs(a.paymentDueDate).valueOf() - dayjs(b.paymentDueDate).valueOf()
  );

  const breakdownByPaymentAndItem = groupBy(
    paymentBreakdowns,
    (pb) => `${pb.paymentId}-${pb.itemId}`
  );

  const rows: PaymentRowViewModel[] = consumptions.map((c) => {
    const styleNumber = `${c.salesOrder.styleNumber}-${c.salesOrder.styleCode}`;

    const cells: PaymentCell[] = sortedPayments.map((p) => {
      const key = `${p.id}-${c.id}`;
      const pb = breakdownByPaymentAndItem[key]?.[0];

      const shippedQuantity = pb?.shippedQuantity ?? 0;
      const unitPrice = pb?.unitPrice ?? c.unitPrice;
      const amount =
        pb?.amount ?? (shippedQuantity ? unitPrice * shippedQuantity : 0);

      return {
        paymentId: p.id,
        shippedQuantity,
        unitPrice,
        amount,
      };
    });

    return {
      salesOrderId: c.salesOrder.id,
      consumptionId: c.id,

      styleNumber,
      supplierItemCode: c.supplierItemCode,
      fabricName: c.fabricName,
      fabricColor: c.colorName,
      orderQuantity: c.orderQuantity,
      unit: c.unit,
      unitPrice: c.unitPrice,
      orderAmount: c.orderAmount,

      cells,
    };
  });

  return { rows, sortedPayments };
}

/** 그랜드 토탈 / 서브토탈용 숫자 합계 */
export function sumAmountMatrix(
  rows: PaymentRowViewModel[],
  payments: Payment[]
) {
  const orderTotals = {
    orderQuantity: 0,
    orderAmount: 0,
  };

  // payment 개수만큼 합계를 만들기
  const paymentTotals = payments.map(() => ({
    shippedQuantity: 0,
    shippedAmount: 0,
  }));

  for (const row of rows) {
    // --- Ordered 합산 ---
    orderTotals.orderQuantity += row.orderQuantity;
    orderTotals.orderAmount += row.orderAmount;

    // --- Payment별 셀 합산 ---
    row.cells.forEach((cell, idx) => {
      paymentTotals[idx].shippedQuantity += cell.shippedQuantity;
      paymentTotals[idx].shippedAmount += cell.amount;
    });
  }

  return {
    orderTotals,
    paymentTotals,
  };
}

/** 각 컬럼의 고유값 집합 추출 (셀렉트 옵션용) */
export function getUniqueOptions(
  rows: PaymentRowViewModel[],
  key: keyof PaymentRowViewModel
): string[] {
  return (
    chain(rows)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map(key as any)
      .uniq()
      .sort()
      .value()
      .map(String)
  );
}
