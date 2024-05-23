
import { useContext } from "react"
import { UserContext } from "./UserContext"

export const UserC = () => {
    const userContext = useContext(UserContext)

    const handleLogin = () => {
        // if (userContext) {
            userContext.setUser({
                name: 'Jane Doe',
                email: 'janedoe@gmail.com'
            })
        // }
    }

    const handleLogout = () => {
        // if (userContext) {
            userContext.setUser(null)
        // }
    }

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            <div>Your name is: {userContext.user?.name}</div>
            <div>Your email is: {userContext.user?.email}</div>
        </div>
    )
}