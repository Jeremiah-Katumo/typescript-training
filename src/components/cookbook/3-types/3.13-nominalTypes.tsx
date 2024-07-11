
// Problem: Your application has several types that are aliases for the same primitive 
// type but with entirely different semantics. Structural typing treats them the 
// same, but it shouldn’t!

// Solution: Use wrapping classes or create an intersection of your primitive type with 
// a literal object type and use this to differentiate two integers.
type Person = { 
    name: string; 
    age: number;
};
type Student = { 
    name: string; 
    age: number;
};

function acceptsPerson(person: Person) { 
    // ...
}
const student: Student = { 
    name: "Hannah", 
    age: 27,
}; 
acceptsPerson(student); // all ok

// One way to achieve this would be wrapping classes. Instead of working with the 
// values directly, we wrap each value in a class. With a private kind property 
// we make sure they don’t overlap:
class Balance {
    private kind = "balance"
    value: number

    constructor(value: number) {
        this.value = value
    }
}
class AccountNumber {
    private kind = "account"
    value: number

    constructor(value: number) {
        this.value = value
    }
}

// This allows us to refine this pattern with a more general approach. Instead of defining 
// a kind member and setting it to a value, we define a _nominal member in each class 
// declaration that is of type void. This separates both classes just enough but keeps us 
// from using _nominal in just any way. void only allows us to set _nominal to undefined, 
// and undefined is a falsy, and thus highly useless:
class BalanceTwo {
    private _nominal: void = undefined
    value: number

    constructor(value: number) {
        this.value = value
    }
}
class AccountNumberTwo {
    private _nominal: void = undefined
    value: number

    constructor(value: number) {
        this.value = value
    }
}

const account = new AccountNumberTwo(123456789)
const balance = new BalanceTwo(5000000)

