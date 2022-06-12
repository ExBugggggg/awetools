const RegexList = {
    "email-en": {"regex": `^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$`, "description": `allow [a-zA-Z], [0-9], '_', '.', '-'`},
    "email-zh": {"regex": `^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$`, "description": `allow ch-ZH, [0-9], [a-zA-Z], english domain`},
    "phonenumber": {"regex": `^1(3|4|5|6|7|8|9)\d{9}$`},
    "domain": {"regex": `^((http:\/\/)|(https:\/\/))?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}(\/)`},
    "ipaddress": {"regex": `((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))`},
    "chZH": {"regex": `^[\u4e00-\u9fa5]{0,}$`}
}


export default RegexList;