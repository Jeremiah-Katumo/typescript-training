
import { Login } from './Login'
import { ProfileProps } from './Profile'

type PrivateProps = {
    isLoggedIn: boolean
    component: React.ComponentType<ProfileProps>   // passing a component prop
}

export const Private = ({ isLoggedIn, component: Component }: PrivateProps) => {
    if (isLoggedIn) {
        return <Component name={'John'}/>
    } else {
        return <Login />
    }
}