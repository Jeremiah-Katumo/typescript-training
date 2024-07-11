
// Problem: Your code produces the correct results, but the types are way too
// wide. You know better!

// Solution: Use type assertions to narrow to a smaller set using the as keyword, 
// indicating an unsafe operation.

type Person = {
    name: string
    age: number
    profession: string
}

function createPerson(name: string) {
    const person = {} as Person
    person.name = name
    person.age = Math.floor(Math.random() * 95)
    // Where's profession
    return person
}
createPerson("Amnon")

// In situations like this, it’s better to opt for a safe object creation.
type PersonTwo = {
    name: string
    age: number
}

function createDemoPerson(name: string) {
    const person: PersonTwo = {
        name,
        age: Math.floor(Math.random() * 95)
    }
    return person
}
createDemoPerson("Caleb")


// When we use the fetch API, for example, getting JSON data from a backend, 
// we can call fetch and assign the results to an annotated type:
type PersonThree = {
    name: string
    age: number
}

// const ppl: PersonThree[] = await fetch("/api/people/").then((res) => res.json())
export const ppl = async () => {
    await fetch("/api/people").then((res) => res.json()) as PersonThree[];
} 