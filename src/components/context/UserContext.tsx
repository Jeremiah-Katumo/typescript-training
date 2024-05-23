
import React, { createContext, useState } from "react"

export type AuthUserC = {
    name: string
    email: string
}

type UserContextType = {
    user: AuthUserC | null
    setUser:  React.Dispatch<React.SetStateAction<AuthUserC | null>>
}

type UserContextProviderProps = {
    children: React.ReactNode
}

// export const UserContext = createContext<UserContextType | null>(null)
export const UserContext = createContext({} as UserContextType)  // type assertion

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<AuthUserC | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )
}