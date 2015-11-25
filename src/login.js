import Api from './api';
import errors from './errors';
import util, {deepify} from './util';

class GithubLogin extends Api {
	constructor(repoUrl){
		super(repoUrl);
	}
	_getUserInfo(api){
		return new Promise((resolve, reject) => {
			api.user.show(null, (err, userInfo) => {
				var error = errors.UserNotFound
				if(err) return reject({error})
				this.userInfo = userInfo;
				this.username = userInfo.login;
				return resolve(api)
			})
		})
	}
	_getAcess(api){
		return new Promise((resolve, reject) => {
			api.repo.userIsCollaborator(this.username, (err, isCollaborator) => {
				var error = errors.AccessDenied
				if(err || !isCollaborator) return reject({error})
				return resolve(api)
			})
		})
	}
	login(){
		return this.auth()
			.then((api)=>this._getUserInfo(api))
			.then((api)=>this._getAcess(api))
	}
}

export default GithubLogin;
export {errors, util, deepify};
