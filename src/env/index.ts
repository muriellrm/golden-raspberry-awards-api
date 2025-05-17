import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["dev","test", "production"]).default("dev"),
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z.string()
})

const _env = envSchema.safeParse(process.env);

if(!_env.success) {
  console.error("❌ Invalid envoirment variables!", _env.error.format())
  throw new Error("Invalid envoirment variables")
}

export const env = _env.data;