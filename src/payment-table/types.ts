export type PaymentStatus = "NOT_YET" | "REQUESTED" | "PENDING" | "PAID"; // 임시

export interface Payment {
  id: number;
  paymentStatus: PaymentStatus;
  paymentDueDate: string;
  requestedAt: string | null;
  pendingAt: string | null;
  paidAt: string | null;
  memo: string | null;
  sourcingFiles: string[];
  financeFiles: string[];
}

export interface GarmentSize {
  id: number;
  name: string;
  orderNum: number;
}

export interface SalesOrderUser {
  id: number;
  name: string;
  engName: string;
  profileImage: string;
}

export interface SalesOrder {
  id: number;
  styleNumber: string;
  styleCode: string;
  createUser: SalesOrderUser;
}

export interface Consumption {
  id: number;
  unitPrice: number;
  orderQuantity: number;
  orderAmount: number;
  fabricName: string;
  fabricClass: string;
  fabricDetail: string;
  supplierItemCode: string;
  brandItemCode: string | null;
  colorName: string;
  sopoNo: string;
  unit: string;
  garmentColorName: string;
  garmentSize: GarmentSize;
  salesOrder: SalesOrder;
}

export interface PaymentBreakdown {
  id: string;
  type: "ITEM";
  shippedQuantity: number;
  unitPrice: number;
  amount: number;
  itemId: number;
  paymentId: number;
}

export interface PaymentCell {
  paymentId: number;
  shippedQuantity: number;
  unitPrice: number;
  amount: number;
}

export interface PaymentRowViewModel {
  // Ordered
  styleNumber: string;
  supplierItemCode: string;
  fabricName: string;
  fabricColor: string;
  orderQuantity: number;
  unit: string;
  unitPrice: number;
  orderAmount: number;

  // 기타 키
  consumptionId: number;
  salesOrderId: number;

  // Payables
  cells: PaymentCell[];
}
