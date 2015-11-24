import qs from 'querystring';
import {merge, noop} from 'lodash';

const LSKey = '__GithubService';

class GithubLoginService{
	constructor(){
		this.state = {
			code: null,
			token: null,
			error: false,
			authenticated: false,
		}
		this._loadState()
		return this;
	}

	_setState(newState){
		this.state = merge(this.state, newState)
		localStorage.setItem(LSKey, JSON.stringify(this.state))
	}

	isAuthenticated(){
		return this.state.authenticated;
	}

	login(){
		if(this.isAuthenticated()){
			return Promise.resolve({token: this.state.token})

		}else if(!this.state.error){
			this._checkCode()

			if(!this.state.code){
				this._requestAuthDialog()
				return new Promise(noop)

			}else{
				return this._deeperAuth(this.state.code)
			}
		}
		return Promise.reject(this.state.error)
	}

	logout(){
		this._resetState();
		return Promise.resolve({})
	}

	_getCodeFromUrl(){
		var query = window.location.search.replace(/^\?/, '');
		if(query.indexOf('code=') > -1){
			var {code} = qs.parse(query);
		}
		return (!!code && code != 'undefined') && code;
	}

	_checkCode(){
		var code = this._getCodeFromUrl()
		if(code){
			this._setState({code})
		}
	}

	_deeperAuth(code){
		var url = 'http://haiku-gatekeeper.herokuapp.com/authenticate/'

		return fetch(url+code)
			.then((response)=>response.json())
			.then((data)=>this._authenticate(data))
			.catch((error)=>this._authenticateError(error))
	}

	_resetState(){
		localStorage.removeItem(LSKey);
		this.constructor();
	}

	_loadState(){
		var snapshot = localStorage.getItem(LSKey, this.state);
		this.state = snapshot ? JSON.parse(snapshot) : this.state
	}

	_requestAuthDialog(){
		window.location = "https://github.com/login/oauth/authorize?client_id=7422da94fba5f7b84e7d&scope=repo";
	}

	_authenticate({token}){
		if(token){
			this._setState({token, authenticated: true})
			return Promise.resolve({token})
		}else{
			return Promise.reject(new Error('authorization token missing'))
		}
	}

	_authenticateError(error){
		this._setState({error})
		return error;
	}
}

// consider using singleton in future;
export default GithubLoginService()
