import express from "express";
import dotenv from "dotenv";
dotenv.config();
export function startExpressServer() {
    const app = express();
    const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
    // Ruta de prueba
    app.get("/", (req, res) => {
        res.send("¡Express + TypeScript funcionando correctamente!");
    });
    // Inicia el servidor
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
}
