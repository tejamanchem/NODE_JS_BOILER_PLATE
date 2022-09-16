import { getOsEnv, getOsEnvOptional, toBool } from "./lib/env";

/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || "dev",
  isProduction: process.env.NODE_ENV === "prod",
  isStg: process.env.NODE_ENV === "stg",
  isTest: process.env.NODE_ENV === "test",
  isDevelopment: process.env.NODE_ENV === "dev",
  app: {
    name: getOsEnv("APP_NAME"),
    version: "1.0.0",
    description: "server/core module",
  },
  log: {
    level: getOsEnv("LOG_LEVEL"),
    json: toBool(getOsEnvOptional("LOG_JSON")),
    output: getOsEnv("LOG_OUTPUT"),
  }
};
