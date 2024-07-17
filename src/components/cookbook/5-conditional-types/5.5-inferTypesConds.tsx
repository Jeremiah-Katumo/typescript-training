
// Inferring Types in Conditionals

type Personal = {
    name: string
    age: number
    hello: () => string
}

class Serializer {
    constructor() {}
    serialize<T>(obj: T): Serialize<T> {
        // ...
        return obj
    }
}

// The first idea that comes to mind is to just drop properties that are functions.
type Remover<O, T> = {
    [K in keyof O as O[K] extends T | undefined ? never : K]: O[K]
}
type Serialize1<T> = Remover<T, Function>

// The first iteration is done, and it works for simple, one-level-deep objects. 
// Objects can be complex,
type Personal2 = {
    name: string
    age: number
    profession: {
        title: string
        level: number
        printProfession: () => void
    }
    hello: () => string
}

// To solve this, we need to check each property if it is another object, and if so, 
// use the Serialize<T> type again. A mapped type called NestSerialization checks in 
// a conditional type if each property is of type object and returns a serialized 
// version of that type in the true branch and the type itself in the false branch:
type NestedSerialization<T> = {
    [K in keyof T]: T[K] extends object ? Serialize1<T[K]> : T[K]
}
type Serialize2<T> = NestedSerialization<Remover<T, Function>>

// We check for every property if it’s an object. If so, we call serialize again. 
// If not, we carry over the property only if it isn’t a function:
class Serializer2 {
    constructor() {}
    serialize<T>(obj: T): Serialize2<T> {
        const ret: Record<string, any> = {}

        for (let k in obj) {
            if (typeof obj[k] === "object") {
                ret[k] = this.serialize(obj[k])
            } else if (typeof obj[k] !== "object") {
                ret[k] = obj[k]
            }
        }
        return ret as Serialize2<T>
    }
}

const person1: Personal2 = {
    name: 'Job',
    age: 26,
    profession: {
        title: "Software Engineer",
        level: 6,
        printProfession() {
            console.log(`${this.title}, Level ${this.level}`)
        }
    },
    hello() {
        return `Hello ${this.name}`
    },
}
const serializer = new Serializer2()
const serializedPerson = serializer.serialize(person1)
console.log(serializedPerson)

// But we are not done yet. The serializer has a special feature. Objects can implement 
// a serialize method, and if they do, the serializer takes the output of this method 
// instead of serializing the object on its own. Let’s extend the Person type to feature 
// a serialize method:
type Personal3 = {
    name: string
    age: number
    profession: {
        title: string
        level: number
        printProfession: () => void
    }
    hello: () => string
    serialize: () => string
}

const person2: Personal3 = {
    name: 'Job',
    age: 26,
    profession: {
        title: "Software Engineer",
        level: 6,
        printProfession() {
            console.log(`${this.title}, Level ${this.level}`)
        }
    },
    hello() {
        return `Hello ${this.name}`
    },
    serialize() {
        return `${this.name}: ${this.profession.title} ${this.profession.level}`
    },
}

// We need to adapt the Serialize<T> type. Before running NestSerialization, we check 
// in a conditional type if the object implements a serialize method. We do so by asking 
// if T is a subtype of a type that contains a serialize method. If so, we need to get 
// to the return type, because that’s the result of serialization.
// This is where the infer keyword comes into play. It allows us to take a type from a 
// condition and use it as a type parameter in the true branch. We tell TypeScript, if 
// this condition is true, take the type that you found there and make it available to us:
type Serialize3<T> = T extends { serialize(): infer R }
    ? R
    : NestedSerialization<Remover<TemplateStringsArray, Function>>

class Serializer3 {
    constructor() {}
    serialize<T>(obj: T): Serialize3<T> {
        // If T contains a serialize method, get its return type and return it. Otherwise, 
        // start serialization by deeply removing all properties that are of type Function.
        if (typeof obj === "object" && obj && typeof obj.serialize === "function") {
            return obj.serialize()
        }
        
        const ret: Record<string, any> = {}

        for (let k in obj) {
            if (typeof obj[k] === "object") {
                ret[k] = this.serialize(obj[k])
            } else if (typeof obj[k] !== "object") {
                ret[k] = obj[k]
            }
        }
        return ret as Serialize3<T>
    }
}