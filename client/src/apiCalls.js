import axios from "axios"

export const loginCall = async (userCredential, dispatch) => {
    try {
        dispatch({ type: "LOGIN_START" })
        const user = await axios.post("/auth/login", userCredential)
        dispatch({ type: "LOGIN_SUCCESS", payload: user.data })
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err })
    }

}
