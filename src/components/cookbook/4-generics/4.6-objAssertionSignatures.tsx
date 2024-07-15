
// Modifying Objects with Assertion Signatures

// Solution: Use assertion signatures to change types independently of if and switch statements.

function check(person: any) {
    person.checked = true
}
const person = {
    name: "Stefan",
    location: "Kwale",
}
check(person)  // person now has the checked property
person.checked   // returns true

// One way to assert that certain properties exist are, well, type assertions. 
// We say that at a certain point in time, this property has a different type:
// (person as typeof person & { checked: boolean }).checked = true

function check2<T>(obj: T): obj is T & { checked: true } {
    (obj as T & { checked: boolean }).checked = true
    return true
}
if (check2(person)) {
    person.checked  // checked is true
}


function assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
        throw new Error(msg)
    }
}
function yell(str: any) {
    assert(typeof str === "string")
    return str.toUpperCase()
}

function assertNumber(val: any): asserts val is number {
    if (typeof val !== "number") {
        throw Error("value is not a number")
    }
}
function add(x: unknown, y: unknown): number {
    assertNumber(x)
    assertNumber(y)
    return x + y
}


function checker<T>(obj: T): asserts obj is T & { checked: true } {
    (obj as T & { checked: boolean }).checked = true
}
checker(person)