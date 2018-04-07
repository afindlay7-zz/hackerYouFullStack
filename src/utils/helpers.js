export function getHeader(authToken){
    const options = {
        headers: {
            Authorization: 'Bearer ' + authToken
        }
    }
    return options;
}

export function isResponseSuccessful(statusCode){
    if ((statusCode >= 200 && statusCode <= 202) || statusCode === 204) {
		return true
	} else {
		return false
	}
}

export function checkIfUpdated(original, updated){
    if (updated !== ''){
        return updated;
    } else {
        return original;
    }
}