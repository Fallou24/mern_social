export function loginStart() {
    return {type:"LOGIN_START"}
}

export function loginSuccess(user) {
    return {type:"LOGIN_SUCCESS",payload:user}
}

export function loginFailure(error) {
    return {type:"LOGIN_FAILURE",payload:error}
}