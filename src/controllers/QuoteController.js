export default class QuoteController {
  constructor(quoteService) {
    this.quoteService = quoteService;
  }

  async createQuote(req, res) {
    const { body } = req;
    const quote = await this.quoteService.createQuote(body);
    return res.status(201).json(quote);
  }

  async getMetrics(req, res) {
    const lastQuotes = req.query.last_quotes;
    const metrics = await this.quoteService.getMetrics(lastQuotes);
    return res.status(200).json(metrics);
  }
}
