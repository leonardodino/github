import Github from 'github-api';

class Api {
	constructor(credentials = {}, repoUrl, options){
		var [repoUser, repoName] = repoUrl.split('/');
		var {username, password} = credentials;
		var github = new Github({
			apiUrl: options.apiUrl
			username: credentials.username,
			password: credentials.password,
			token: credentials.token,
			auth: credentials.token ? 'oauth' : 'basic'
		});
		
		this.repoName = repoName;
		this.repoUser = repoUser;
		this.repo = github.getRepo(repoUser, repoName);
		this.user = github.getUser();
		return this
	}
}

export default Api;
