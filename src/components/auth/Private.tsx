
import { Login } from './Login'

export const Private = ({ isLoggedIn, Component }) => {
    if (isLoggedIn) {
        return <Component />
    } else {
        return <Login />
    }
}