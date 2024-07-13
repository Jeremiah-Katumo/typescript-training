
// Problem: You have two functions that work the same, but on different and largely
// incompatible types

// Solution: Generalize their behavior using generics.

type Languages = { 
    de: URL; 
    en: URL; 
    pt: URL; 
    es: URL; 
    fr: URL; 
    ja: URL;
};

function isLanguageAvailable(
    collection: Languages,
    lang: string
): lang is keyof Languages {
    return lang in collection
}

function loadLanguage(
    collection: Languages, 
    lang: string
) {
    if (isLanguageAvailable(collection, lang)) {
        const a = collection[lang]
        return a
    }
}



type AllowedElements = { 
    video: HTMLVideoElement; 
    audio: HTMLAudioElement; 
    canvas: HTMLCanvasElement;
};

function isElementAllowed( 
    collection: AllowedElements, 
    elem: string
): elem is keyof AllowedElements { 
    return elem in collection;
}

function selectElement(
    collection: AllowedElements, 
    elem: string
) { 
    if (isElementAllowed(collection, elem)) { 
        // elem is keyof AllowedElements 
        const a = collection[elem]; // access ok
        return a
    } 
}


// We can use this generic type parameter like we would use AllowedElements or Languages 
// and can add a type predicate. Since Obj can be substituted for every type, key needs 
// to include all possible property keys— string, symbol, and number:
function isAvailable<Obj>( 
    obj: Obj, 
    key: string | number | symbol
): key is keyof Obj { 
    return key in obj;
}
function loadLanguageTwo(
    collection: Languages, 
    lang: string
) { 
    if (isAvailable(collection, lang)) { 
        // lang is keyof Languages 
        const b = collection[lang]; // access ok!
        return b
    } 
}
function selectElementTwo(
    collection: AllowedElements, 
    elem: string
) { 
    if (isAvailable(collection, elem)) { 
        // elem is keyof AllowedElements 
        const c = collection[elem]; // access ok
        return c
    } 
}