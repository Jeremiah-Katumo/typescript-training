
// void as a substitute for callbacks

function fetchResults(
    callback: (statusCode: number, results: number[]) => void
) {
    const didItWork = callback(200, [2, 3])
    return didItWork
}

function handler(statusCode: number): boolean {
    return true
}

fetchResults(handler)