import axios from "axios";
import logger from "../utils/logger.js";

export default class FreteRapidoAPI {
  BASE_URL = "https://sp.freterapido.com/api/v3";

  async postQuote(quote) {
    try {
      const response = await axios.post(`${this.BASE_URL}/quote/simulate`, quote, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      logger.error(error.toString());
    }
  }
}
