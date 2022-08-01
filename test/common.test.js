import {
    UnicodeToChinese,
    ChineseToUnicode,
    ASCIIToChinese,
    ChineseToASCII,
    Base64Encode,
    Base64Decode,
    XToChinese,
    ChineseToX,
    InArray,
    IsHex
} from '@assets/common'

/* eslint-disable no-undef */
test('Chinese To Unicode', () => {
    expect(ChineseToUnicode('你好')).toBe('\\u4f60\\u597d')
    expect(ChineseToUnicode('你好Hello')).toBe('\\u4f60\\u597dHello')
})
test('Unicode To Chinese', () => {
    expect(UnicodeToChinese('\\u4f60\\u597d')).toBe('你好')
})
test('Chinese To ASCII', () => {
    expect(ChineseToASCII('你好')).toBe('&#20320;&#22909;')
})
test('ASCII To Chinese', () => {
    expect(ASCIIToChinese('&#20320;&#22909;')).toBe('你好')
})
test('&#x To Chinese', () => {
    expect(XToChinese('&#x4f60;&#x597d;')).toBe('你好')
})
test('Chinese To &#x', () => {
    expect(ChineseToX('你好')).toBe('&#x4f60;&#x597d;')
    expect(ChineseToX('123')).toBe('&#x0031;&#x0032;&#x0033;')
})
test('Base64 Encode', () => {
    expect(Base64Encode('你好Hello')).toBe('5L2g5aW9SGVsbG8=')
})
test('Base64 Decode', () => {
    expect(Base64Decode('5L2g5aW9SGVsbG8=')).toBe('你好Hello')
})

expect(InArray(1, [1, 2, 3])).toBeTruthy()
expect(InArray(4, [1, 2, 3])).toBeFalsy()

expect(IsHex('2jmj7l5rSw0yVb/vlWAYkK/YBwk=')).toBeFalsy()
expect(IsHex('da39a3ee5e6b4b0d3255bfef95601890afd80709')).toBeTruthy()
/* eslint-enable */