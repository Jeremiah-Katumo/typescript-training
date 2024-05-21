//-------------
// Typing props

type GreetProps = {
    name: string
    messageCount?: number      // add a ? to show that messageCount is optional
    isLoggedIn: boolean
}

export const Greet = (props: GreetProps) => {

    // this is how to define props for optional content; ...
    // here the default of messageCount is set to 0
    const { messageCount = 0 } = props

    return (
        <div>
            <h2>
                {props.isLoggedIn 
                    ? `Welcome ${props.name}! You have ${messageCount} unread messages` 
                    : 'Welcome Guest'}
            </h2>
        </div>
    )
}