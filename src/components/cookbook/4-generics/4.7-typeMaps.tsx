
// Mapping Types with Type Maps

import { createElement } from "react";

// Problem: 

const a = createElement("a", { href: 'https://youtube.com' }) // HTMLAnchorElement
const b = createElement("video", { src: "/advert.mp4", autoplay: true }) // HTMLVideoElement
const c = createElement("my-element") // HTMLElement

// A good way to provide a mapping between element tag names and prototype objects 
// is to use a type map. A type map is a technique where you take a type alias or 
// interface and let keys point to the respective type variants.
type AllElements = {
    a: HTMLAnchorElement
    div: HTMLDivElement
    video: HTMLVideoElement
}
type A = AllElements["a"]
type AandDiv = AllElements["a" | "div"]
console.log(a, b, c)

// Let’s use this map to type the createElement function. We use a generic type 
// parameter constrained to all keys of AllElements, which allows us to pass only 
// valid HTML elements:
function createElementFn<T extends keyof AllElements>(tag: T): AllElements[T] {
    return document.createElement(tag as string) as AllElements[T]
}
const aa = createElementFn("a")
console.log(aa)

// Now we want to provide the option to pass extra properties for said HTML 
// elements, to set an href to an HTMLAnchorElement, and so forth. All properties 
// are already in the respective HTMLElement variants, but they’re required, not optional.
// We can make all properties optional with the built-in type Partial<T>. It’s a 
// mapped type that takes all properties of a certain type and adds a type modifier:
type Partial2<T> = { [P in keyof T]?: T[P] }

// We extend our function with an optional argument props that is a Partial of the 
// indexed element from AllElements. This way, we know that if we pass an "a", we 
// can only set properties that are available in HTMLAnchorElement:
function createElementFn2<T extends keyof AllElements>(
    tag: T,
    props?: Partial2<AllElements[T]>
): AllElements[T] {
    const elem = document.createElement(tag as string) as AllElements[T]
    return Object.assign(elem, props)
}
const aaa = createElementFn2("a", { href: 'https://localhost' })
const bbb = createElementFn2("a", { src: 'https://localhost' })


function createElementFn3<T extends keyof HTMLElementTagNameMap>(
    tag: T,
    props?: Partial2<HTMLElementTagNameMap[T]>
): HTMLElementTagNameMap[T] {
    const elem = document.createElement(tag)
    return Object.assign(elem, props)
}


// To allow for more—as document.createElement does—we would need to add all
// possible strings to the mix again. HTMLElementTagNameMap is an interface.
// So we can use declaration merging to extend the interface with an indexed 
// signature, where we map all remaining strings to HTMLUnknownElement:
interface HTMLElementTagNameMap {
    [x: string]: HTMLUnknownElement
}

function createElementFn4<T extends keyof HTMLElementTagNameMap>(
    tag: T,
    props?: Partial2<HTMLElementTagNameMap[T]>
): HTMLElementTagNameMap[T] {
    const elem = document.createElement(tag)
    return Object.assign(elem, props)
}

// The last is great, but what if you only want to allow for web components? 
// Web components have a convention; they need to have a dash in their tag name. 
// We can model this using a mapped type on a string template literal type.
// Mapped types work only with type aliases, not interface declarations, so 
// we need to define an AllElements type again:
type AllElements1 = HTMLElementTagNameMap & {
    [x in `${string}-${string}`]: HTMLElement
}

function createElementFn5<T extends keyof AllElements1>(
    tag: T,
    props?: Partial2<AllElements1[T]>
): AllElements1[T] {
    const elem = document.createElement(tag as string) as AllElements1[T]
    return Object.assign(elem, props)
}
const aaaa = createElementFn5("a", { href: 'https://localhost.ce' }) // OK 
const bbbb = createElementFn5("my-element") // OK
const cccc = createElementFn5("thisWillError")

// Function overload technique
function createElementFn6(
    tag: string, 
    props?: Partial<HTMLElement>
): HTMLElement { 
    const elem = document.createElement(tag); 
    return Object.assign(elem, props);
}