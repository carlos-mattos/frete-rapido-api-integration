export function calculate(data) {
  const results = {
    resultCountByCarrier: {},
    totalShippingPriceByCarrier: {},
    averageShippingPriceByCarrier: {},
    cheapestShippingPrice: Infinity,
    mostExpensiveShippingPrice: -Infinity,
  };

  data.forEach(({ carrier, final_price }) => {
    const { name: carrierName } = carrier;

    results.resultCountByCarrier[carrierName] ??= 0;
    results.resultCountByCarrier[carrierName]++;

    results.totalShippingPriceByCarrier[carrierName] ??= 0;
    results.totalShippingPriceByCarrier[carrierName] += final_price;

    results.cheapestShippingPrice = Math.min(
      results.cheapestShippingPrice,
      final_price
    );
    results.mostExpensiveShippingPrice = Math.max(
      results.mostExpensiveShippingPrice,
      final_price
    );
  });

  for (const [carrierName, totalShippingPrice] of Object.entries(
    results.totalShippingPriceByCarrier
  )) {
    const resultCount = results.resultCountByCarrier[carrierName];
    results.averageShippingPriceByCarrier[carrierName] =
      totalShippingPrice / resultCount;
  }

  return results;
}
