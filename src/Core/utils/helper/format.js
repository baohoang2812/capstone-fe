export function formatToCurrencyVND(number) {
  if (number) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(0);
}

export function formatToCurrencyUSD(number) {
  if (number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      currencyDisplay: "narrowSymbol",
    }).format(number);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
  }).format(0);
}

export function formatNumberDec(number) {
  if (number) {
    return new Intl.NumberFormat("vi-VN", {
      maximumSignificantDigits: 3,
    }).format(number);
  }

  return new Intl.NumberFormat("vi-VN", {
    maximumSignificantDigits: 3,
  }).format(0);
}

export const stringToHslColor = (str, s = 30, l = 80) => {
  var hash = 0;
  for (var i = 0; i < str?.length; i++) {
    hash = str?.charCodeAt(i) + ((hash << 5) - hash);
  }

  var h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
};
