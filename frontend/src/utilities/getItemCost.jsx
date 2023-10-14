const getItemCost = (price) => {
  const cost = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return cost;
};

export { getItemCost };
