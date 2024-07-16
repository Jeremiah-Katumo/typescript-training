
// Adding Const Context to Generic Type Parameters

import { Component } from "react";

// Problem: When you pass complex, literal values to a function, TypeScript widens 
// the type to something more general. While this is desired behavior in a lot of 
// cases, in some you want to work on the literal types rather than the widened type.

// Solution: Add a const modifier in front of your generic type parameter to keep the 
// passed values in const context.

interface ComponentConstructor {
    new(): Component
}

interface ComponentI {
    render(): HTMLElement
}

type Route = {
    path: string,
    component: ComponentConstructor
}

function router<T extends Route>(routes: T[]) {
    return {
        navigate(path: T["path"]) {
            // ...
        }
    }
}

function getPath<T extends string>(route: T): T {
    return route
}
const path = getPath("/")
// The router works as intended; it takes an array of Route objects and returns 
// an object with a navigate function, which allows us to trigger the navigation 
// from one URL to the other and renders the new component:
const rtr = router([
    {
        path: "/",
        component: Main,
    },
    {
        path: "/about",
        component: About,
    },
])
rtr.navigate("/faq")

type Routes = {
    paths: string[]
}

function getPaths<T extends Routes>(routes: T): T["paths"] {
    return routes.paths
}
const paths = getPaths({ paths: ["/", "/about"]})


function router1<T extends Route>(routes: readonly T[]) {
    return {
        navigate(path: T["path"]) {
            history.pushState({}, "", path)
        },
    }
}
const rtr1 = router1([
    {
        path: "/",
        component: Main,
    },
    {
        path: "/about",
        component: About
    }
])
rtr1.navigate("/about")


function router2<const T extends Route>(routes: T[]) {
    return {
        navigate(path: T["path"]) {
            history.pushState({}, "", path)
        },
    }
}
const rtr2 = router2([
    {
        path: "/",
        component: Main,
    },
    {
        path: "/about",
        component: About
    }
])
rtr2.navigate("/about")
rtr2.navigate("/faq")