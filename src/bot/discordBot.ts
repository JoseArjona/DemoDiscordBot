import { Client, SlashCommandBuilder, Events } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const HELLO_COMMAND = 'bot'

export function startDiscordBot() {
	const client = new Client({
		presence: {
			status: "online",
			activities: [{ name: "a ser un bot" }],
		},
		intents: []
	});

	client.once(Events.ClientReady, c => {
		console.log("¡Bienvenido a mi servidor de prueba!", c.user.username);

		const helloWorld = new SlashCommandBuilder()
			.setName(HELLO_COMMAND)
			.setDescription('a seguir chambeando');

		client.application?.commands.create(helloWorld);
	});

	client.on(Events.InteractionCreate, async interaction => {
		if (!interaction.isChatInputCommand()) return;
		if (interaction.commandName === HELLO_COMMAND) {
			interaction.reply(`Chambea más ${interaction.member?.user.username}! `);
		}
	});

	client.login(process.env.TOKEN);
}