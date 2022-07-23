/**
 * This file just put some functions.
 */

import { Base64 } from 'js-base64'

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
        return (String.fromCharCode(parseInt((encodeURIComponent($0).replace(/(%5Cu)(\w{1,4})/g, '$2')), 16)))
    })
}

// Unicode convert to ASCII
const UnicodeToASCII = (source) => {
    return source.replace(/(&#x)(\w{1,4});/gi, ($0) => {
        return (String.fromCharCode(parseInt((encodeURIComponent($0).repalce(/(%26%23x)(\w{1,4})(%3B)/g, '$2')), 16)))
    })
}

// ASCII convert to Chinese
const ASCIIToChinese = (source) => {
    return source.replace(/(&#)(\d{1,6});/gi, ($0) => {
        return (String.fromCharCode(parseInt((encodeURIComponent($0).replace(/(%26%23)(\d{1,6})(%3B)/g, '$2')))))
    })
}

// Chinese convert to Unicode
const ChineseToUnicode = (source) => {
    let unicodeString = ''
    for(let character of source){
        if(/[\u4e00-\u9fa5]/.test(character)){
            unicodeString += '\\u' + character.charCodeAt(0).toString(16)
        }else{
            unicodeString += character
        }
    }
    return unicodeString
}

// Base64 Encode
const Base64Encode = (source) => {
    return Base64.encode(source)
}
// Base64 Decode
const Base64Decode = (source) => {
    return Base64.decode(source)
}

const InArray = (element, searchArray) => {
    for(let i of searchArray){
        if(element === i){
            return true
        }
    }
    return false
}

const IsMobile = () => {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
}

export { 
    RedirectTo,
    OpenWindow,
    UnicodeToChinese,
    ChineseToUnicode,
    Base64Encode,
    Base64Decode,
    UnicodeToASCII,
    ASCIIToChinese,
    InArray,
    IsMobile
}