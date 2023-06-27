import { Quote } from "../entities/Quote.js";
import Database from "../config/database.js";

export default class QuoteRepository {
  async saveQuotes(quotes) {
    const connection = await Database.getConnection();

    try {
      const quoteRepository = connection.getRepository(Quote);

      const quotesSaved = [];

      for (const quote of quotes) {
        const quoteCreated = await quoteRepository.create(quote);
        await quoteRepository.save(quoteCreated);
        quotesSaved.push(quoteCreated);
      }

      return quotesSaved;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getLastQuotes(lastQuotes) {
    const connection = await Database.getConnection();

    try {
      const quoteRepository = connection.getRepository(Quote);

      const query = {
        order: {
          created_at: "DESC",
        },
      };

      if (lastQuotes) {
        query.take = lastQuotes;
      }

      const quotes = await quoteRepository.find(query);

      return quotes;
    } catch (error) {
      throw new Error(error);
    }
  }
}
