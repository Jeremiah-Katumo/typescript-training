
//  Managing Complex Function Signatures

// Problem:You are creating a function with varying parameters and return types. 
// Managing all variations using function overloads gets increasingly complex.

// Solution: Use conditional types to define a set of rules for parameter and return types.

type StringLabel = {
    name: string
}
type NumberLabel = {
    id: number
}

// User input is either a string or a number. The createLabel function takes the input 
// as a primitive type and produces either a StringLabel or NumberLabel object:

// Function Overload
// The way function overloads work is that the overloads themselves define types 
// for usage, whereas the last function declaration defines the types for the 
// implementation of the function body
function createLabel(input: number): NumberLabel; 
function createLabel(input: string): StringLabel;
function createLabel(input: StringLabel): StringLabel; 
function createLabel(input: NumberLabel): NumberLabel;
function createLabel(input: string | StringLabel): StringLabel; 
function createLabel(input: number | NumberLabel): NumberLabel;
function createLabel(input: number | string | StringLabel | NumberLabel): NumberLabel | StringLabel;
function createLabel(input: number | string | StringLabel | NumberLabel): NumberLabel | StringLabel {
    if (typeof input === "number") {
        return { id: input }
    } else {
        return { name: input }
    }
}

// This is problematic in cases where we couldn’t narrow the input type beforehand.
// We lack a function type to the outside that allows us to pass in input that is 
// either number or string:
function inputToLabel(input: string | number) {
    return createLabel(input) // try commenting line 25 and see the error, can be solved by comment below
}
// To circumvent this, we add another overload that mirrors the implementation 
// function signature for very broad input types:
// function createLabel(input: number | string): NumberLabel | StringLabel;

type IsString<T> = T extends string ? T : never

type A = IsString<string> // string
type B = IsString<"hello" | "world"> // string
type C = IsString<1000> // never



type GetLabel<T> = T extends string | StringLabel
    ? StringLabel
    : T extends number | NumberLabel
    ? NumberLabel
    : never


function createLabel2<T extends number | string | StringLabel | NumberLabel>(
    input: T
): GetLabel<T> {
    if (typeof input === "number") {
        return { id: input } as GetLabel<T>
    } else if (typeof input === "string") {
        return { name: input } as GetLabel<T>
    } else if ("id" in input) {
        return { id: input.id } as GetLabel<T>
    } else {
        return { name: input.name } as GetLabel<T>
    }
}
createLabel2(1500)

// Final of function overload
function createLabel3<T extends number | string | StringLabel | NumberLabel>(
    input: T
): GetLabel<T>
function createLabel3(
    input: number | string | StringLabel | NumberLabel
): NumberLabel | StringLabel {
    if (typeof input === "number") {
        return { id: input } 
    } else if (typeof input === "string") {
        return { name: input } 
    } else if ("id" in input) {
        return { id: input.id } 
    } else {
        return { name: input.name } 
    }
}
createLabel3("Namesake")