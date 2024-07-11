
// Problem: Your discriminated union types change over time, adding new parts to the union. 
// It becomes difficult to track all occurrences in your code where you need to 
// adapt to these changes.

// Solution: Create exhaustiveness checks where you assert that all remaining cases 
// can never happen with an assertNever function.

type Circle = {
    radius: number
    kind: "circle"
}

type Square = {
    x: number
    kind: "square"
}

type Triangle = {
    x: number
    y: number
    kind: "triangle"
}

type Rectangle = {
    length: number
    width: number
    kind: "rectangle"
}

type Shape = Circle | Square | Triangle | Rectangle

function assertNever(value: never) {
    console.error("Unknown value:", value)
    throw Error("Not possible")
}

function Area(shape: Shape) {
    switch (shape.kind) {
        case "circle":  // shape is Circle
            return Math.PI * shape.radius * shape.radius
        case "square":  // shape is Square
            return shape.x * shape.x
        case "triangle":  // shape is Triangle
            return (shape.x * shape.y) / 2
        case "rectangle":  // shape is Rectangle
            return shape.length * shape.width
        default:  // shape is never
            assertNever(shape)  // shape can be passed to assertNever
            // console.error("Shape not defined:", shape)
            // throw Error("not possible")
    }
}

const circle: Shape = {
    radius: 3,
    kind: "circle"
}

Area(circle)


const ccircle = {
    radius: 5,
    kind: "circle"
} as Circle

Area(ccircle)


const cccircle = {
    radius: 5,
    kind: "circle" as "circle"
}

Area(cccircle)


const ccccircle = {
    radius: 5,
    kind: "circle" as const
}

Area(ccccircle)


const cccccircle = {
    radius: 5,
    kind: "circle"
} as const

Area(cccccircle)