import { COUPON_CODES } from "../../lib/sales/couponCode";
import { getActiveSaleByCouponCode } from "../../lib/sales/getActiveSaleByCouponCode";

async function HoliBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.PPHOLI);

  if (!sale?.isActive) {
    return null;
  }
  return (
    <div className="bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
      Holi Banner
    </div>
  );
}

export default HoliBanner;
