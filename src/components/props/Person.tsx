//------------
// Basic props

type PersonProps = {
    name: {
        firstName: string
        lastName: string
    }
}

export const Person = (props: PersonProps) => {

    return (
        <div>
            <h3>
                {props.name.firstName} {props.name.lastName}
            </h3>
        </div>
    )
}