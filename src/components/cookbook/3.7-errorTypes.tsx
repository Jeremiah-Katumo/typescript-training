
try {
    myroutine()
} catch (e) {
    if (e instanceof TypeError) {

    } else if (e instanceof EvalError) {

    } else if (typeof e === "string") {

    } else {
        console.log(e)
    }
}



const somePromise = () => new Promise((fulfill, reject) => {
    if (someConditionIsValid()) {
        fulfill(42)
    } else {
        reject("Oh no!")
    }
})

somePromise()
    .then((val) => console.log(val))
    .catch((e) => console.log(e))

// It becomes clearer if you call the same Promise in an async/await flow:
try {
    const z = async () => await somePromise();
} catch(e) {
    console.log(e)
}

export {}

// If you want to define your own errors and catch accordingly, you can either 
// write error classes and do instance of checks or create helper functions 
// that check for certain properties and tell the correct type via type predicates. 
// Axios is again a good example for that:
function isAxiosError(payload: any): payload is AxiosError { 
    return payload !== null 
        && typeof payload === 'object' 
        && payload.isAxiosError;
}