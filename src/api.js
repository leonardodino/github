import Github from 'github-api';
import GithubAuth from './auth'

class Api {
	constructor(repoUrl, options){
		var [repoUser, repoName] = repoUrl.split('/');
		this.repoName = repoName;
		this.repoUser = repoUser;
	}
	auth(){
		return new GithubAuth().login()
			.then(({token})=>{
				var github = new Github({
					token: token,
					auth: 'oauth'
				});
				this.repo = github.getRepo(this.repoUser, this.repoName);
				this.user = github.getUser();
				return Promise.resolve(this)
			})
	}
}

export default Api;
