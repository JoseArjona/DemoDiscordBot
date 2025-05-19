import dotenv from "dotenv";
import { startDiscordBot } from "./bot/discordBot.js";
import { startExpressServer } from "./server/expressServer.js";
// Carga variables de entorno desde .env
dotenv.config();
// Inicializa el bot de Discord
startDiscordBot();
// Inicializa el servidor Express
startExpressServer();
console.log("Aplicación iniciada correctamente");
