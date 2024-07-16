
// Generating New Object Types

// Problem: You have a type in your application that is related to your model. 
// Every time the model changes, you need to change your types as well.

// Solution: Use generic mapped types to create new object types based on the original type.

type ToyBase = {
    name: string
    description: string
    minimumAge: number
}

type BoardGame = ToyBase & {
    kind: "boardgame"
    players: number
}

type Puzzle = ToyBase & {
    kind: "puzzle"
    pieces: number
}

type Doll = ToyBase & {
    kind: "doll"
    material: "plush" | "plastic"
}

type Toy = BoardGame | Puzzle | Doll

// Somewhere in our code, we need to group all toys from our model in a data 
// structure that can be described by a type called GroupedToys. GroupedToys 
// has a property for each category (or "kind") and a Toy array as value.
type GroupedToys = {
    boardgame: Toy[]
    puzzle: Toy[]
    doll: Toy[]
}
function groupToys(toys: Toy[]): GroupedToys {
    const groups: GroupedToys = {
        boardgame: [],
        puzzle: [],
        doll: [],
    }
    for (let toy of toys) {
        groups[toy.kind].push(toy)
    }
    return groups
}

// Months and sprints pass, and we need to touch our model again. The toy shop 
// is now selling original or maybe alternate vendors of interlocking toy bricks. 
// We wire the new type Bricks up to our Toy model:

type Bricks = ToyBase & {
    kind: "bricks"
    pieces: number
    brand: string
}

type Toy2 = BoardGame | Puzzle | Doll | Bricks

type GroupedToys2 = {
    boardgame?: Toy2[]
    puzzle?: Toy2[]
    doll?: Toy2[]
    bricks?: Toy2[]
}

function groupToys2(toys: Toy2[]): GroupedToys2 {
    const groups: GroupedToys2 = {}
    for (let toy of toys) {
        // Initialize when available
        groups[toy.kind] = groups[toy.kind] ?? []
        groups[toy.kind]?.push(toy)
    }

    return groups
}

// we can use a type to be a property key of a newly generated type. 
// Each property has an optional type modifier and points to a Toy[]:
type GroupedToys3 = {
    [k in Toy["kind"]]?: Toy2[]
}


type GroupedToys4 = Group2<Toy, "kind">

// type Group<Collection, Selector extends keyof Collection> = {
//     [x in Collection[Selector]]?: Collection[]
// }

// This type is built-in!
type Record1<K extends string | number | symbol, T> = {
    [P in K]: T
}
// First option
type Group2<
    Collection extends Record<string, any>, 
    Selector extends keyof Collection
> = {
    [x in Collection[Selector]]?: Collection[]
}
// Second option
type Group3<Collection, Selector extends keyof Collection> = {
    [k in Collection[Selector] extends string
        ? Collection[Selector]
        : never]?: Collection[]
}
// This type is built-in!
type Partial1<T> = { [P in keyof T]?: T[P] }

type GroupedToys5 = Partial1<Group3<Toy, "kind">>