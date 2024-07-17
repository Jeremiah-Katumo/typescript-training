
// Grouping Elements with Kind

// Solution: Use the Extract helper type to pick the right member from a union type.

type ToyBase1 = {
    name: string
    description: string
    minimumAge: number
}

type BoardGame1 = ToyBase1 & {
    kind: "boardgame"
    players: number
}

type Puzzle1 = ToyBase1 & {
    kind: "puzzle"
    pieces: number
}

type Doll1 = ToyBase1 & {
    kind: "doll"
    material: "plush" | "plastic"
}

type Toy1 = BoardGame1 | Puzzle1 | Doll1

// Thanks to generics, we were able to define a helper type Group<Collection, Selector> 
// to reuse the same pattern for different scenarios:
type Group<
    Collection extends Record<string, any>,
    Selector extends keyof Collection
> = {
    [K in Collection[Selector]]: Collection[]
}

// We then found a way to derive another type called GroupedToys from Toy, where we 
// take the union type members of the kind property as property keys for a mapped type, 
// where each property is of type Toy[]:

type GroupedToysOne = {
    boardgame?: BoardGame1[] | undefined
    puzzle?: Puzzle1[] | undefined
    doll?: Doll1[] | undefined
}

// We can achieve this type by extracting the respective member from the Collection union 
// type. Thankfully, there is a helper type for that: Extract<T, U>, where T is the 
// collection, U is part of T. Extract<T, U> is defined as:
// type Extract<T, U> = T extends U ? T : never
type ExtractDoll = Extract<Toy1, { kind: "doll" }>

// With distributive conditional types, a conditional type of a union is a 
// union of conditional types, so each member of T is checked against U:
type ExtractDoll2 = 
    BoardGame extends { kind: "doll" } ? BoardGame : never
    | Puzzle extends { kind: "doll" } ? Puzzle : never
    | Doll extends { kind: "doll" } ? Doll : never

// In a union with never, never just disappears. So the resulting type is Doll:
// type ExtractedDoll = never | never | Doll
type ExtractedDoll = Doll

// So the generic version of Extract<Toy, { kind: "doll" }> within 
// Group<Collection, Selector> is this:
type GroupTwo<
    Collection extends Record<string, any>,
    Selector extends keyof Collection
> = {
    [K in Collection[Selector]]: Extract<Collection, { [P in Selector]: K }>[]
}

function groupToysTwo(toys: Toy[]): GroupedToysOne {
    const groups: GroupedToysOne = {}
    for (let toy of toys) {
        switch (toy.kind) {
            case "boardgame":
                groups[toy.kind] = groups[toy.kind] ?? []
                groups[toy.kind]?.push(toy)
                break
            case "doll":
                groups[toy.kind] = groups[toy.kind] ?? []
                groups[toy.kind]?.push(toy)
                break
            case "puzzle":
                groups[toy.kind] = groups[toy.kind] ?? []
                groups[toy.kind]?.push(toy)
                break
        }
    }
    return groups
}

// That works, but there’s lots of duplication and repetition we want to avoid.
// Second, we can use a type assertion to widen the type of groups[toy.kind] so 
// TypeScript can ensure index access:
function groupToysThree(toys: Toy[]): GroupedToysOne {
    const groups: GroupedToysOne = {}
    for (let toy in toys) {
        (groups[toy.kind] as Toy[]) = groups[toy.kind] ?? []
        (groups[toy.kind] as Toy[])?.push(toy)
    }
    return groups
}


function groupToysFour(toys: Toy[]): GroupedToysOne {
    const groups: GroupedToysOne = {}
    for (let toy of toys) {
        assign(groups, toy.kind, toy)
    }
    return groups
}

function assign<T extends Record<string, K[]>, K>(
    groups: T,
    key: keyof T,
    value: K
) {
    // Initialize when not available
    groups[key] = groups[key] ?? []
    groups[key]?.push(value)
}