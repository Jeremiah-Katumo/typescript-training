
// Problem: Your model requires you to have mutually exclusive parts of a union, 
// but your API can’t rely on the kind property to differentiate.

// Solution: Use the optional never technique to exclude certain properties.

type SelectBase = {
    options: string[]
}

type SingleSelect = SelectBase & {
    value: string
    values?: never
    kind: "single"
}

type MultipleSelect = SelectBase & {
    value?: never
    values: string[]
    kind: "multiple"
}

type SelectProperties = SingleSelect | MultipleSelect

function selectCallback(params: SelectProperties) {
    if (params.kind === "single" && "value" in params) {
        return params.value
    } else if (params.kind === "multiple" && "values" in params) {
        return params.values
    } else {
        return params
    }
}

const single = {
    options: ["dracula", "monokai", "vscode"],
    value: "dracula"
} as SingleSelect
selectCallback(single)

const multiple = {
    options: ["dracula", "monokai", "vscode"],
    values: ["dracula", "vscode"]
} as MultipleSelect
selectCallback(multiple)

const all = { 
    options: ["dracula", "monokai", "vscode"], 
    // values: ["dracula", "vscode"], 
    value: "dracula",
    kind: "single" as const
} // still works! Which one to choose?
selectCallback(all)

selectCallback({
    options: ["dracula", "monokai", "vscode"], 
    // values: ["dracula", "vscode"], 
    value: "dracula",
    kind: "single"
})

selectCallback({
    options: ["dracula", "monokai", "vscode"], 
    values: ["dracula", "vscode"], 
    // value: "dracula",
    kind: "multiple"
})