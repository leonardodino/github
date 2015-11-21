import { objectMap as map } from './util';

var errorObj = {
	AccessDenied: null,
	UserNotFound: null,
}

function parseErrorString(_null, string){
	// separate camelcase
	return string.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export default map(errorObj, parseErrorString);
