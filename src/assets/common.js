// Redirect to external url
const RedirectTo = (url) => {
    window.location.href = url
}
// Open a new window
const OpenWindow = (url) => {
    window.open(url)
}

// Unicode convert to Chinese
const UnicodeToChinese = (source) => {
    return source.replace(/(\\u)(\w{1,4})/gi, ($0) => {
        return (String.fromCharCode(parseInt((encodeURIComponent($0).replace(/(%5Cu)(\w{1,4})/g, "$2")), 16)))
    })
}

// Unicode convert to ASCII
// @todo, unknow this function
const UnicodeToASCII = (source) => {
    return source.replace(/(&#x)(\w{1,4});/gi, ($0) => {
        return (String.fromCharCode(parseInt((encodeURIComponent($0).repalce(/(%26%23x)(\w{1,4})(%3B)/g,"$2")), 16)))
    })
}

// ASCII convert to Chinese
// @todo, unknow this function
const ChineseToASCII = (source) => {
    return source.replace(/(&#)(\d{1,6});/gi, ($0) => {
        return (String.fromCharCode(parseInt((encodeURIComponent($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")))))
    })
}

export { 
    RedirectTo,
    OpenWindow,
    UnicodeToChinese
}