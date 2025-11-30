import { PaymentTable } from "@/payment-table/PaymentTable";

export function Home() {
  return (
    <>
      <img
        src="/src/images/sije-logo.png"
        alt="로고 이미지"
        width="70"
        height="25"
        className="object-contain"
      />
      <PaymentTable />
    </>
  );
}
