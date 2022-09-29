import React, { createContext, useReducer } from 'react';
import { reducer } from './authReducer';
const INITIALSTATE = {
    user: null,
    isFetching: false,
    error: false
}
export const authContext = createContext(INITIALSTATE);

const AuthContextProvider = ({ children }) => {
    const [user, dispatch] = useReducer(reducer, INITIALSTATE);
    
    return (
        <authContext.Provider
            value={{ user: user.user, isFetching: user.isFetching, error: user.error, dispatch }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthContextProvider;