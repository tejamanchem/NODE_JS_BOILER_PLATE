import {
  getOsPaths
} from "../lib/env";

// const nodeEnv = process.env.NODE_ENV;


export const dbConfigConnections = [];
dbConfigConnections.push({
  name: process.env.ACP_CONNECTION_NAME,
  type: process.env.ACP_CONNECTION,
  host: process.env.ACP_HOST,
  username: process.env.ACP_USERNAME,
  password: process.env.ACP_PASSWORD,
  database: process.env.ACP_DATABASE,
  port: Number.parseInt(process.env.ACP_PORT, 10),
  entities: getOsPaths('ACP_ENTITIES'),
  migrations: getOsPaths('ACP_MIGRATIONS'),
  migrationsRun: process.env.ACP_MIGRATIONS_RUN === 'true',
  seeds: [process.env.ACP_SEEDING_SEEDS],
  factories: [process.env.ACP_SEEDING_FACTORIES],
  subscribers: getOsPaths('ACP_SUBSCRIBERS'),
  cli: {
    migrationsDir: process.env.ACP_MIGRATIONS_DIR,
    entitiesDir: process.env.ACP_ENTITIES_DIR,
    subscribersDir: process.env.ACP_SUBSCRIBERS_DIR
  },
  pool: {
    max: Number(process.env.TYPEORM_MAX_POOL)
  }
})

