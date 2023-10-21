import React, { createContext, useContext, useEffect, useState } from 'react'

export const UserContext = createContext()


const UserProvider = ({ children }) => {
    const [state, setState] = useState(null)

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider


//custom hook below
export function useUser() {
    return useContext(UserContext);
}
