// frontend/src/utils/numberUtils.ts
export const numberUtils = {
  // Format currency with proper locale and currency symbol
  formatCurrency: (
    amount: number,
    currency = "USD",
    locale = "en-US"
  ): string => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(amount);
  },

  // Format number with commas
  formatNumber: (num: number, locale = "en-US"): string => {
    return new Intl.NumberFormat(locale).format(num);
  },

  // Parse string to number safely
  parseNumber: (str: string): number => {
    const num = parseFloat(str);
    return isNaN(num) ? 0 : num;
  },

  // Calculate percentage
  calculatePercentage: (value: number, total: number): number => {
    if (total === 0) return 0;
    return (value / total) * 100;
  },

  // Round to specified decimal places
  roundTo: (num: number, decimals: number): number => {
    return Number(Math.round(Number(num + "e" + decimals)) + "e-" + decimals);
  },

  // Clamp number between min and max
  clamp: (num: number, min: number, max: number): number => {
    return Math.min(Math.max(num, min), max);
  },
};
