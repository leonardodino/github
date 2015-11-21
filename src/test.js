import Login, { deepify } from './login';
var login = new Login({token: process.env.GITHUB_TOKEN}, 'leonardodino/dokku');

var parseTree = (err, tree)=> err ? console.error(err) : console.log(deepify(tree))
var getTree = (api)=> api.repo.getTree('master?recursive=true', parseTree)

login.authenticate()
	.then(getTree)
	.catch((err)=>console.error(err))
