export const thousandformater = (
  value,
  fractionDigits = 2,
  locale = "en-US"
) => {
  if (value === null || value === undefined || value === "") return "";
  const num = Number(value);
  if (isNaN(num)) return value; // if not a number, return original string

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(num);
};
