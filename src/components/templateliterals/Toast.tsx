
/**
 * Position prop can be one of
 * "left-center" | "left-top" | "left-bottom" | "center" |
 * "center-bottom" | "center-top" | "right-top" | "right-center" | "right-bottom"
 */

export const Toast = ({ position }) => {
    return (
        <div>Toast Notification Position - {position}</div>
    )
}