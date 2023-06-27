import { calculate } from "../helpers/metrics-calculation.js";

export default class quoteService {
  constructor(quoteRepository, freteRapidoAPI) {
    this.quoteRepository = quoteRepository;
    this.freteRapidoAPI = freteRapidoAPI;
  }

  async createQuote(quote) {
    const response = await this.freteRapidoAPI.postQuote(quote);

    if (response.dispatchers) {
      const quotesCreated = this.quoteRepository.saveQuotes(
        response.dispatchers
      );
      return quotesCreated;
    }

    return [];
  }

  async getMetrics(lastQuotes) {
    const quotes = await this.quoteRepository.getLastQuotes(lastQuotes);

    const metrics = [];

    for (const quote of quotes) {
      if (quote.offers) {
        const metricsByQuote = calculate(quote.offers);
        metrics.push({
          id: quote.id,
          zipcode_origin: quote.zipcode_origin,
          metrics: metricsByQuote,
          created_at: quote.created_at,
        });
      }
    }

    return metrics;
  }
}
