import { COUPON_CODES } from "../../lib/sales/couponCode";
import { getActiveSaleByCouponCode } from "../../lib/sales/getActiveSaleByCouponCode";

async function HoliBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.PPDIWALI);

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-600 via-pink-500 to-yellow-500 text-white px-4 sm:px-6 py-8 sm:py-10 mx-4 mt-2 rounded-2xl shadow-xl">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center lg:text-left lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Text Content */}
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              {sale.title}
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold opacity-95">
              {sale.description}
            </p>
          </div>

          {/* Coupon Code Box */}
          <div className="flex-shrink-0">
            <div className="bg-white text-gray-900 py-4 px-6 sm:py-5 sm:px-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 border-4 border-yellow-400">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <div className="text-center sm:text-left">
                  <span className="block text-sm sm:text-base font-semibold text-gray-600 uppercase tracking-wide">
                    Use Code:
                  </span>
                  <span className="block text-2xl sm:text-3xl font-black text-red-600 tracking-wider">
                    {sale.couponCode}
                  </span>
                </div>
                <div className="hidden sm:block w-px h-12 bg-gray-300" />
                <div className="text-center sm:text-left">
                  <span className="block text-sm sm:text-base font-semibold text-gray-600">
                    Get
                  </span>
                  <span className="block text-2xl sm:text-3xl font-black text-green-600">
                    {sale.discountAmount}% OFF
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoliBanner;
