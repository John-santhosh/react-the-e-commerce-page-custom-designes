export const formatPrice = (number) => {
  const newNum = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format((number / 100) * 50);

  return newNum;
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);

  if (type === "colors") {
    unique = unique.flat();
  }

  unique = new Set(unique);

  return ["all", ...unique];
};
