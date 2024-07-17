
// Removing Specific Object Properties

// Problem: You want to create a generic helper type for objects, where you select 
// properties based on their type rather than the property’s name.

// Solution: Filter with conditional types and type assertions when mapping property keys.
type Persona = {
    name: string
    age: number
    profession?: string
}

type PersonaStrings = {
    name: string
    profession?: string
}

type Picker<T, K extends keyof T> = {
    [P in K]: T[P]
}

type PersonName = Pick<Persona, "name">

type PersonaStrings2 = Pick<Persona, "name" | "profession">
type PersonaNumbers = Pick<Persona, "age">

// If we want to remove certain properties, we can use Omitter<T>, which works just like 
// Picker<T> with the small difference that we map through a slightly altered set of 
// properties, one where we remove property names that we don’t want to include:
type Omitter<T, K extends string | number | symbol> = {
    [P in Exclude<keyof T, K>]: T[P]
}

type PersonWithoutAge = Omit<Person, "age">


type PersonStrings3 = {
    [K  in keyof Persona as Persona[K] extends string | undefined
        ? K
        : never]: Persona[K]
}


type Select<O, T> = {
    [K in keyof O as O[K] extends T | undefined ? K : never]: O[K]
}
type PersonaStrings4 = Select<Persona, string>
type PersonaStrings5 = Select<Persona, number>


type StringFnsReturningNumber = Select<String, (...args: any[]) => number>

type Remove<O, T> = {
    [K in keyof O as O[K] extends T | undefined ? never : K]: O[K]
}
type PersonWithoutStrings = Remove<Persona, string>


type User = {
    name: string
    age: number
    profession?: string
    posts(): string[]
    greeting(): string
}