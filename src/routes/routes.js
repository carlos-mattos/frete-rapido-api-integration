import express from "express";
import QuoteController from "../controllers/QuoteController.js";
import QuoteService from "../services/QuoteService.js";
import QuoteRepository from "../repositories/QuoteRepository.js";
import FreteRapidoAPI from "../gateway/FreteRapidoAPI.js";

const router = express.Router();

const quoteRepository = new QuoteRepository();
const freteRapidoAPI = new FreteRapidoAPI();
const quoteService = new QuoteService(quoteRepository, freteRapidoAPI);
const quoteController = new QuoteController(quoteService);

router.post("/quote", quoteController.createQuote.bind(quoteController));
router.get("/metrics", quoteController.getMetrics.bind(quoteController));

export default router;
