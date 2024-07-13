
type FilterRule = {
    field: string
    operator: string
    value: any
}

type CombinatorialFilter = {
    combinator: "and" | "or"
    rules: FilterRule[]
}

type ChainedFilter = {
    rules: (CombinatorialFilter | FilterRule)[]
}

type Filter = CombinatorialFilter | ChainedFilter

function reset<F extends Filter>(filter: F) {
    if ("combinator" in filter) {
        // filter is CombinatorialFilter
        return { combinator: "and", rules: [] }
    }
    // filter is ChainedFilter
    return { rules: [] }
}
const filter: CombinatorialFilter = { rules: [], combinator: "or" }
const resetFilter = reset(filter) // filter is Filter
console.log(resetFilter)
const onDemandFilter = reset({
    combinator: "and",
    rules: [],
    evaluated: true,
    result: false
})
console.log(onDemandFilter)


function resettwo<F extends Filter>(filter: F): F {
    const result = { ...filter }
    result.rules = []
    if ("combinator" in result) {
        result.combinator = "and"
    }
    return result
}
const resetFilterTwo = resettwo(filter)
console.log(resetFilterTwo)




type BaseTreeItem = {
    id: string
    children: BaseTreeItem[]
}

type TreeItem<Children extends TreeItem = BaseTreeItem> = {
    id: string
    children: Children[]
    collapsed?: boolean
}

// function createRootItem(): TreeItem { 
//     return { 
//         id: "root", 
//         children: [],
//     }; 
// }
// function attachToRoot(children: TreeItem[]): TreeItem { 
//     return { 
//         id: "root", 
//         children,
//     }; 
// }
// function attachToRoot<T extends TreeItem>(children: T[]): TreeItem { 
//     return { 
//         id: "root", 
//         children,
//     }; 
// }
function attachToRoot<T extends TreeItem>(children: T[]): TreeItem<T> {
    return {
        id: "root",
        children
    }
}
const root = attachToRoot([
    {
        id: "child",
        children: [],
        collapsed: false,
        marked: true
    }
])
console.log(root)