import { GithubIssuePayload, GithubStarPayload } from '../interfaces';

export class GithubService {
	constructor() {}

	onStar(payload: GithubStarPayload): string {
		const { action, sender, repository, starred_at } = payload;

		return `User ${sender.login} ${action} star on ${repository.full_name}`;
	}

	onIssue(payload: GithubIssuePayload): string {
		let message: string = '';
		const { action, issue } = payload;

		if (action === 'opened') {
			message = `An issue was opened with this title: ${issue.title}`;
			return message;
		}

		if (action === 'closed') {
			message = `An issue was closed by: ${issue.user.login}`;
			return message;
		}
		if (action === 'reopened') {
			message = `An issue was reopened by: ${issue.user.login}`;
			return message;
		}

		return `Unhandled action for the issue event ${action}`;
	}
}
