
// Filtering with Never

// Problem: You have a union of various types but you just want to have all subtypes of string.

// Solution: Use a distributive conditional type to filter for the right type.

// You can access each element of your list through index access. A type for 
// such an ElementList can be described using an index access type for number 
// index access, together with regular string property keys:
type ElementList = {
    addClass: (className: string) => ElementList
    removeClass: (className: string) => ElementList
    on: (event: string, callback: (ev: Event) => void) => ElementList
    length: number
    [x: number]: HTMLElement
}


// // begin excerpt 
// addClass: function (className: string): ElementList { 
//     for (let i = 0; i < this.length; i++) { 
//         this[i].classList.add(className);
//     } 
//     return this; 
// },
// removeClass: function (className: string): ElementList { 
//     for (let i = 0; i < this.length; i++) { 
//         this[i].classList.remove(className);
//     } 
//     return this;
// }, 
// on: function (event: string, callback: (ev: Event) => void): ElementList { 
//     for (let i = 0; i < this.length; i++) { 
//         this[i].addEventListener(event, callback);
//     } 
//     return this; 
// }, 
// // end excerpt

// As an extension of a built-in collection like Array or NodeList, changing 
// things on a set of HTMLElement objects becomes really convenient:
declare const myCollection: ElementList

myCollection
    .addClass("toggle-of")
    .removeClass("toggle-on")
    .on("click", (e) => {})

myCollection[1].classList.toggle("toggle-on")

// Since you can’t change the original library code (too many departments depend 
// on it), you decide to wrap the original ElementList in a Proxy. Proxy objects 
// take an original target object and a handler object that defines how to handle access.
const safeAccessCollection = new Proxy(myCollection, {
    get(target, property) {
        if (
            typeof property === "string" 
                && property in target 
                && "" + parseInt(property) !== property
        ) {
            return target[property as keyof typeof target]
        }
        return undefined
    }
})
// This works great in JavaScript, but our types don’t match anymore. The return 
// type of the Proxy constructor is ElementList again, which means that the number 
// index access is still intact:
safeAccessCollection[0].classList.toggle("toggle-on")

// We need to tell TypeScript that we are now dealing with an object with 
// no number index access by defining a new type. 
// Let’s look at the keys of ElementList. If we use the keyof operator, we get 
// a union type of all possible access methods for objects of type ElementList:
type ElementListKeys = keyof ElementList
// It contains four strings as well as all possible numbers. Now that we have 
// this union, we can create a conditional type that gets rid of everything 
// that isn’t a string:
type JustStrings<T> = T extends string ? T : never



type safeAccess = Pick<ElementList, JustStrings<keyof ElementList>>

type safeAccess2 = {
    addClass: (className: string) => ElementList
    removeClass: (className: string) => ElementList
    on: (event: string, callback: (ev: Event) => void) => ElementList
    length: number
}

const safeAccessCollection2: Pick<
    ElementList,
    JustStrings<keyof ElementList>
> = new Proxy(myCollection, {
    get(target, property) {
        if (
            typeof property === "string" 
                && property in target 
                && "" + parseInt(property) !== property
        ) {
            return target[property as keyof typeof target]
        }
        return undefined
    }
})
safeAccessCollection2[1].classList.toggle("toggle-on")

// See 5.3-