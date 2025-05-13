import express, { type Request, type Response } from "express";
import dotenv from "dotenv";

// Carga variables de entorno desde .env
dotenv.config();

const app = express();
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;

// Ruta de prueba
app.get("/", (req: Request, res: Response) => {
	res.send("¡Express + TypeScript funcionando correctamente!");
});

// Inicia el servidor
app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
