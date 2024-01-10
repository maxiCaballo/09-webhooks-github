import { Request, Response } from 'express';
import { GithubService } from '../../service/github.service';
import { DiscordService } from '../../service/discord.service';

export class GithubController {
	//DI
	constructor(
		private readonly githubService = new GithubService(),
		private readonly discordService = new DiscordService(),
	) {}

	webhookHandler = (req: Request, res: Response) => {
		const githubEvent = req.header('x-github-event') ?? 'unkwown';
		const payload = req.body;
		let message: string;

		switch (githubEvent) {
			case 'star':
				message = this.githubService.onStar(payload);
				break;
			case 'issues':
				message = this.githubService.onIssue(payload);
				break;
			default:
				message = `Unkown event: ${githubEvent}`;
		}

		this.discordService
			.notify(message)
			.then(() => res.status(202).send('Accepted'))
			.catch(() => res.status(500).json({ error: 'Internal server error' }));
	};
}
//El github event puede venir tanto desde github o desde otro lado por eso hay que hacer la verificacion correspondiente
//con el signature que es un token que debemos validar para saber si esa info viene de github.
