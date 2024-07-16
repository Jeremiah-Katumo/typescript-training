
// Using ThisType to Define this in Objects 

// Problem: Your app requires complex configuration objects with methods, where 
// this has a different context depending on usage.

// Solution: Use the built-in generic ThisType<T> to define the correct this.

// A data function, A computed property, A methods property
const instance = create({
    data() {
        return {
            firstName: "Jere",
            lastName: "Snr"
        }
    },

    computed: {
        fullName() {
            return this.firstName + " " + this.lastName
        }
    },

    methods: {
        hi() {
            alert(this.fullName.toLowerCase())
        }
    }
})



type Options<Data, Computed> = {
    data(this: {})?: Data;
    computed?: Computed & ThisType<Data>
}

// An object of functions
type FnObj = Record<string, () => any>
// ... to an object of return types
type MapFnToProp<FunctionObj extends FnObj> = {
    [K in keyof FunctionObj]: ReturnType<FunctionObj[K]>
}

// We can use MapFnToProp to set ThisType for a newly added generic type parameter 
// called Methods. We also add Data and Methods to the mix. To pass the Computed 
// generic type parameter to MapFnToProp, it needs to be constrained to FnObj, 
// the same constraint of the first parameter FunctionObj in MapFnToProp:
type Options2<Data, Computed extends FnObj, Methods> = {
    data(this: {})? Data
    computed?: Computed & ThisType<Data>
    methods?: Methods & ThisType<Data & MapFnToProp<Computed> & Methods>
}

declare function creat<Data, Computed extends FnObj, Methods>(
    options: Options2<Data, Computed, Methods>
): any 