import { DataSource } from "typeorm";
import logger from "../utils/logger.js";

let connection = null;

export default class Database {
  connection = null;

  constructor() {}

  static async initialize() {
    if (connection) {
      return connection;
    }

    try {
      const AppDataSource = new DataSource({
        type: "postgres",
        host: "postgres",
        port: 5432,
        username: "user",
        password: "postgres",
        database: "freterapido",
        synchronize: true,
        logging: false,
        entities: ["src/entities/**/*.js"],
        subscribers: [],
        migrations: [],
      });

      connection = await AppDataSource.initialize();

      logger.info("Connected to database");

      return connection;
    } catch (error) {
      logger.error("Error connecting to database");
      throw new Error(error);
    }
  }

  static async getConnection() {
    if (!connection) {
      await this.initialize();
    }

    return connection;
  }
}
