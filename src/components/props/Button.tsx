// event props

type ButtonProps = {
    handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void
}

export const Button = (props: ButtonProps) => {
    return (
        <div>
            <button onClick={event => props.handleClick(event, 2)}>
                Click
            </button>
        </div>
    )
}