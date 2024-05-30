
/**
 * Position prop can be one of
 * "left-center" | "left-top" | "left-bottom" | "center" |
 * "center-bottom" | "center-top" | "right-top" | "right-center" | "right-bottom"
 */

type HorizontalPosition = 'left' | 'center' | 'right'
type VerticalPosition = 'top' | 'center' | 'bottom'

type ToastProps = {
    position: 
        | Exclude<`${HorizontalPosition}-${VerticalPosition}`, 'center-center'>
        | 'center'
}

export const Toast = ({ position }: ToastProps) => {
    return (
        <div>Toast Notification Position - {position}</div>
    )
}