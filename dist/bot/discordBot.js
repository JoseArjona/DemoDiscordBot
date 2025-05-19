import { Client, SlashCommandBuilder, Events, GatewayIntentBits, } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
// Simular __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HELLO_COMMAND = "bot";
const TEMO_COMMAND = "temo";
const CUMPLE_COMMAND = "cumpleaños";
const MESSAGE_COMMAND = "mensaje";
const BIRTHDAYS_FILE = path.resolve(__dirname, "birthdays.json");
// Cargar cumpleaños guardados
function loadBirthdays() {
    try {
        if (!fs.existsSync(BIRTHDAYS_FILE)) {
            fs.writeFileSync(BIRTHDAYS_FILE, JSON.stringify({}));
            return {};
        }
        const data = fs.readFileSync(BIRTHDAYS_FILE, "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        console.error("Error leyendo birthdays.json:", error);
        return {};
    }
}
// Guardar cumpleaños en archivo
function saveBirthdays(data) {
    try {
        fs.writeFileSync(BIRTHDAYS_FILE, JSON.stringify(data, null, 2));
    }
    catch (error) {
        console.error("Error guardando birthdays.json:", error);
    }
}
export function startDiscordBot() {
    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages],
        presence: {
            status: "online",
            activities: [{ name: "a ser un bot" }],
        },
    });
    client.once(Events.ClientReady, async (c) => {
        console.log("¡Bienvenido a mi servidor de prueba!", c.user.username);
        // Comandos slash
        const helloWorld = new SlashCommandBuilder()
            .setName(HELLO_COMMAND)
            .setDescription("a seguir chambeando");
        const temoCommand = new SlashCommandBuilder()
            .setName(TEMO_COMMAND)
            .setDescription("Un comando para expresar que le va al América");
        const cumpleCommand = new SlashCommandBuilder()
            .setName(CUMPLE_COMMAND)
            .setDescription("Registra tu cumpleaños (MM-DD)")
            .addStringOption((option) => option
            .setName("fecha")
            .setDescription("Tu cumpleaños en formato MM-DD (ej: 03-21)")
            .setRequired(true));
        const messageCommand = new SlashCommandBuilder()
            .setName(MESSAGE_COMMAND)
            .setDescription("Dile lo que quieras a alguien del server")
            .addUserOption((option) => option
            .setName("usuario")
            .setDescription("Elige al puto que quieras")
            .setRequired(true))
            .addStringOption((option) => option
            .setName("mensaje")
            .setDescription("Mensaje que quieres enviar")
            .setRequired(true));
        await client.application?.commands.create(helloWorld);
        await client.application?.commands.create(temoCommand);
        await client.application?.commands.create(cumpleCommand);
        await client.application?.commands.create(messageCommand);
        // Inicia chequeo de cumpleaños
        startBirthdayChecker(client);
    });
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isChatInputCommand())
            return;
        if (interaction.commandName === HELLO_COMMAND) {
            await interaction.reply(`Chambea más ${interaction.member?.user.username}!`);
        }
        else if (interaction.commandName === TEMO_COMMAND) {
            await interaction.reply(`Temo le va al América!`);
        }
        else if (interaction.commandName === CUMPLE_COMMAND) {
            const fecha = interaction.options.getString("fecha", true);
            // Validación MM-DD
            if (!/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(fecha)) {
                return interaction.reply({
                    content: "Formato inválido. Usa MM-DD, por ejemplo 03-21.",
                    ephemeral: true,
                });
            }
            const birthdays = loadBirthdays();
            birthdays[interaction.user.id] = fecha;
            saveBirthdays(birthdays);
            await interaction.reply(`🎉 ¡Fecha de cumpleaños registrada: ${fecha}!`);
        }
        else if (interaction.commandName === MESSAGE_COMMAND) {
            const usuario = interaction.options.getUser("usuario", true);
            const mensaje = interaction.options.getString("mensaje", true);
            // Menciona al usuario y muestra el mensaje
            await interaction.reply(`${usuario} 👋 ${interaction.user.username} te dice: "${mensaje}"`);
        }
    });
    client.login(process.env.DISCORD_BOT_TOKEN);
}
// Chequea cada día si alguien cumple años
function startBirthdayChecker(client) {
    setInterval(async () => {
        const now = new Date();
        const diaMes = `${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        const birthdays = loadBirthdays();
        // Cambia esto por el ID de tu servidor y canal
        const guildId = "1004561680262500362";
        const channelId = "1374106757307301949";
        const guild = client.guilds.cache.get(guildId);
        if (!guild) {
            console.error("Servidor no encontrado.");
            return;
        }
        const channel = guild.channels.cache.get(channelId);
        if (!channel || !channel.isTextBased()) {
            console.error("Canal no encontrado o no es un canal de texto.");
            return;
        }
        for (const [userId, fecha] of Object.entries(birthdays)) {
            if (fecha === diaMes) {
                try {
                    const user = await client.users.fetch(userId);
                    await channel.send(`🎉 ¡Hoy es el cumpleaños de <@${userId}>! 🎂 ¡Felicidades, ${user.username}! 🎈`);
                }
                catch (error) {
                    console.error(`No se pudo felicitar a ${userId}:`, error);
                }
            }
        }
    }, 5 * 60 * 1000); // Chequea cada 5 minutos
}
