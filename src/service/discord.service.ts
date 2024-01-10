import { envs } from '../config';

export class DiscordService {
	private readonly discordWebhookUrl: string = envs.DISCORD_WEBHOOK_URL;

	constructor() {}

	async notify(message: string) {
		const body = {
			content: message,
			//Para enviar GIF o Imagen
			// embeds: [
			// 	{
			// 		image: {
			// 			url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzAxNjdsb2twdDliNDdibDI2dHJ6emRtbmx2eDEzNmFjZ285a2FsbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZtMkorgeyRu5q/giphy.gif',
			// 		},
			// 	},
			// ],
		};

		const response = await fetch(this.discordWebhookUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			console.log('Error sending message');
			return false;
		}

		return true;
	}
}
