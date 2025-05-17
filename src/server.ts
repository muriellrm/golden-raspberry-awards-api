import { app } from "./app";
import { env } from "./env";

app.listen({
  host: env.HOST,
  port: env.PORT,
},() => console.log(`🔥 HTTP Server Running On Port ${env.PORT}!`));
