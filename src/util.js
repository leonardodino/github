function objectForEach(object, fn, thisArg){
	// follows lodash standard
	return Object.keys(object).forEach(function(prop){
		fn(object[prop], prop, object);
	}, thisArg);
}

function objectMap(object, fn){
	// follows lodash standard
	return Object.keys(object).reduce(function(newObject, prop){
		newObject[prop] = fn(object[prop], prop, object);
		return newObject;
	}, {});
}

function setDeep(object, path, value, separator, childPath){
	if (typeof path === 'string'){
		var path = path.split(separator);
	}

	object[childPath] = object[childPath] || {};
	var p = path.shift();

	if(path.length){
		object[childPath][p] = object[childPath][p] || {};
		setDeep(object[childPath][p], path, value, separator, childPath);
	}else{
		if(typeof value === 'object'){
			value.name = value.name || p
		}
		object[childPath][p] = value;
	}
}

function deepify(tree){
	var deepTree = {}
	var childPath = 'children'
	tree.forEach(function(object){
		if(object.path){
			setDeep(deepTree, object.path, object, '/', childPath)
		}
	})
	return deepTree[childPath]
}

export {objectMap, objectForEach, deepify}
