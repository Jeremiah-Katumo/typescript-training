
// Grouping Elements with Kind

// Solution: Use the Extract helper type to pick the right member from a union type.

type ToyBase1 = {
    name: string
    description: string
    minimumAge: number
}

type BoardGame1 = ToyBase & {
    kind: "boardgame"
    players: number
}

type Puzzle1 = ToyBase & {
    kind: "puzzle"
    pieces: number
}

type Doll1 = ToyBase & {
    kind: "doll"
    material: "plush" | "plastic"
}

type Toy1 = BoardGame1 | Puzzle1 | Doll1

type GroupedToysOne = {
    boardgame?: BoardGame1[] | undefined
    puzzle?: Puzzle1[] | undefined
    doll?: Doll1[] | undefined
}

type Group<
    Collection extends Record<string, any>,
    Selector extends keyof Collection
> = {
    [K in Collection[Selector]]: Collection[]
}


// type Extract<T, U> = T extends U ? T : never
type ExtractDoll = Extract<Toy1, { kind: "doll" }>

// With distributive conditional types, a conditional type of a union is a 
// union of conditional types, so each member of T is checked against U:
type ExtractDoll2 = 
    BoardGame extends { kind: "doll" } ? BoardGame : never
    | Puzzle extends { kind: "doll" } ? Puzzle : never
    | Doll extends { kind: "doll" } ? Doll : never

// type ExtractedDoll = never | never | Doll
type ExtractedDoll = Doll

// So the generic version of Extract<Toy, { kind: "doll" }> 
// within Group<Collec tion, Selector> is this:
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