import app from "../app.js";
import logger from "../utils/logger.js";
import Database from "./database.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await Database.initialize();
  logger.info(`Server running on port ${PORT}`);
});
