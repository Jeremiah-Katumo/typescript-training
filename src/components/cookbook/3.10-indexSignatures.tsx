
// Problem: You want to work with objects where you know the type of the values, but you don’t know all the property names up front.

// Solution: Use index signatures to define an open set of keys but with defined value types.

const Timings = { 
    "fettblog.eu": { 
        ttfb: 300, 
        fcp: 1000, 
        si: 1200, 
        lcp: 1500, 
        tti: 1100, 
        tbt: 10,
    },
    "typescript-book.com": { 
        ttfb: 400, 
        fcp: 1100, 
        si: 1100, 
        lcp: 2200, 
        tti: 1100, 
        tbt: 0,
    }, 
};
// If we want to find the domain with the lowest timing for a given metric, 
// we can create a function where we loop over all keys, index each metrics 
// // entry, and compare:
// function findLowestTiming(collection, metric) {
//     let result = {
//         domain: "",
//         value: Number.MAX_VALUE,
//     }

//     for (const domain in collection) {
//         const timing = collection[domain]
//         if (timing[metric] < result.value) {
//             result.domain = domain
//             result.value = timing[metric]
//         }
//     }

//     return result.domain
// }

type Metrics = {
    ttfb: number
    fcp: number
    si: number
    lcp: number
    tti: number
    tbt: number
}

type MetricCollection = {
    [domain in string]: Metrics;
}

function findLowestTiming(
    collection: MetricCollection,
    key: keyof Metrics
): string {
    let result = {
        domain: "",
        value: Number.MAX_VALUE,
    }
    for (const domain in collection) {
        const timing = collection[domain]
        if (timing && timing[key] < result.value) {
            result.domain = domain
            result.value = timing[key]
        }
    }

    return result.domain
}

const emptySet: MetricCollection = {}
// access with optional chaining and nullish coalescing
let timing = (emptySet["typescript-cookbook.com"]?.fcp ?? 0) * 2

// You can also add properties to your type. Take this ElementCollection, for example, 
// which allows you to index items via a number but also has additional properties 
// for get and filter functions as well as a length property:
type ElementCollection = {
    [y: number]: HTMLElement | undefined
    get(index: number): HTMLElement | undefined
    length: number
    filter(callback: (element: HTMLElement) => boolean): ElementCollection
}

// type StringDictionary = {
//     [index: string]: string
//     count: number
// }
type StringOrNumberDict = {
    [index: string]: string | number
    count: number
}