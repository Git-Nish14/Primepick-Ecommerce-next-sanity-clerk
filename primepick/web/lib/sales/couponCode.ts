export const COUPON_CODES = {
  PPHOLI: "PPHOLI",
  PPDIWALI: "PPDIWALI",
  PPNAVRATRI: "PPNAVRATRI",
} as const;

export type Couponcode = keyof typeof COUPON_CODES;
