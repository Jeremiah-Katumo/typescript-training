
type LanguagesTwo = {
    de: URL
    en: URL
    pt: URL
    es: URL
    fr: URL
    ja: URL
}

const languagestwo: LanguagesTwo = { /*.....*/ }

type URLList = {
    [x: string]: URL
}

function fetchFile<List extends URLList>(urls: List, key: keyof List) {
    return fetch(urls[key]).then((res) => res.json())
}
const de = fetchFile(languagestwo, 'de')
console.log(de)
// const it = fetchFile(languages, 'it')

// function fetchFiles<List extends URLList>(urls: List, keys: (keyof List)[]) {
//     const els = keys.map((el) => 
//         fetch(urls[el])
//             .then((res) => res.json())
//             .then((data) => {
//                 const entry: [keyof List, any] = [el, data]
//                 return entry
//             })
//     )
//     return els
// }
// const de_and_fr = fetchFiles(languagestwo, ["de", "fr"])
// console.log(de_and_fr)
function fetchFiles<List extends URLList, Keys extends keyof List>(
    urls: List, 
    keys: Keys[]
) {
    const els = keys.map((el) => 
        fetch(urls[el])
            .then((res) => res.json())
            .then((data) => {
                const entry: [keyof List, any] = [el, data]
                return entry
            })
    )
    return els
}
const de_and_ja = fetchFiles<Languages, "ja" | "de">(languagestwo, ["de"])
console.log(de_and_ja)