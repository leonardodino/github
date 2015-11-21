import Api from './api';
import errors from './errors';
import util, {deepify} from './util';

class GithubLogin extends Api {
	constructor(credentials, repoUrl){
		super(credentials, repoUrl);
	}
	_getUserInfo(){
		return new Promise((resolve, reject) => {
			this.user.show(null, (err, userInfo) => {
				var error = errors.UserNotFound
				if(err) return reject({error})
				this.userInfo = userInfo;
				this.username = userInfo.login;
				return resolve()
			})
		})
	}
	_getAcess(){
		return new Promise((resolve, reject) => {
			this.repo.userIsCollaborator(this.username, (err, isCollaborator) => {
				var error = errors.AccessDenied
				if(err || !isCollaborator) return reject({error})
				return resolve()
			})
		})
	}
	authenticate(){
		return this._getUserInfo()
			.then(()=>this._getAcess())
			.then(()=>Promise.resolve(this))
	}
}

export default GithubLogin;
export {errors, util, deepify};
