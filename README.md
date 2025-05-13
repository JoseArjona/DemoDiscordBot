# demoDiscord

Este proyecto es un bot de Discord desarrollado con Node.js y TypeScript, diseñado inicialmente para funcionar como un mensajero que puede recibir peticiones HTTP y enviar mensajes a un canal específico de Discord.

Tecnologías Utilizadas
Node.js

TypeScript

discord.js - Librería para interactuar con la API de Discord.

Express - Framework web para crear el servidor HTTP.

dotenv - Para cargar variables de entorno.

tsx - Para ejecutar archivos TypeScript directamente en desarrollo.

Configuración del Proyecto
Clona el repositorio:

git clone https://github.com/JoseArjona/DemoDiscordBot
cd demoDiscord

Instala las dependencias:

pnpm install

Crea un archivo .env:
En la raíz del proyecto, crea un archivo llamado .env y añade las siguientes variables:

DISCORD_BOT_TOKEN=TU_TOKEN_AQUI
TARGET_CHANNEL_ID=ID_DEL_CANAL_AQUI
PORT=3000 # O el puerto que prefieras para el servidor HTTP

DISCORD_BOT_TOKEN: El token de tu bot de Discord (obtenido del Portal de Desarrolladores de Discord).

TARGET_CHANNEL_ID: El ID del canal de Discord al que el bot enviará los mensajes (activa el Modo Desarrollador en Discord, haz clic derecho en el canal y "Copiar ID").

PORT: El puerto en el que el servidor HTTP de Express escuchará las peticiones.

Uso
Modo Desarrollo
Para ejecutar el bot en modo desarrollo con tsx (que recarga automáticamente al detectar cambios):

pnpm dev

El servidor HTTP estará disponible en http://localhost:PORT (donde PORT es el número que configuraste en .env).

Modo Producción
Para compilar el código TypeScript a JavaScript y ejecutarlo:

Compila el proyecto:

pnpm build

Esto limpiará el directorio dist y compilará los archivos .ts a .js.

Inicia el bot compilado:

pnpm start

Funcionalidad Actual
Actualmente, el bot inicializa un servidor HTTP usando Express. Puedes enviar peticiones POST a la ruta /send-message con un cuerpo JSON que contenga la propiedad message para que el bot envíe ese texto al canal de Discord configurado en TARGET_CHANNEL_ID.

Ejemplo de petición (usando curl):

curl -X POST http://localhost:PORT/send-message \
-H "Content-Type: application/json" \
-d '{"message": "¡Hola desde mi aplicación! Hay un nuevo feedback."}'

(Reemplaza PORT con el puerto de tu servidor)

¡Eso es todo por ahora! Puedes expandir este README a medida que añadas más funcionalidades a tu bot.
