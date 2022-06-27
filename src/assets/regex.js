const RegexDescription = {
    Reference: 'https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference',
    Regex: {
        CharacterClasses: {
            name: 'Character Classes',
            description: '',
            items: [
                {
                    symbol: `[ character_group ]`,
                    description: `Matches any single character in <code>character_group</code>. By default, the match is case-sensitive.`,
                    pattern: `[ae]`,
                    matches: `"a" in "gray"`
                },
                {
                    symbol: `[^ character_group ]`,
                    description: `Negation: Matches any single character that is not in <code>character_group</code>. By default, characters in <code>character_group</code> are case-sensitive.`,
                    pattern: `[^aei]`,
                    matches: `"r", "g", "n" in "reign"`
                },
                {
                    symbol: `[ first - last ]`,
                    description: `Character range: Matches any single character in the range from first to last.`,
                    pattern: `[A-Z]`,
                    matches: `"A", "B" in "AB123"`
                },
                {
                    symbol: `.`,
                    description: `Wildcard: Matches any single character except <code>\\n</code>.To match a literal period character (<code>.</code> or <code>\\u002E</code>), you must precede it with the escape character (<code>\\.</code>).`,
                    pattern: `a.e`,
                    matches: `"ave" in "nave"`
                },
                {
                    symbol: `\\w`,
                    description: `Matches any word character.`,
                    pattern: `\\w`,
                    matches: `"I", "D", "A", "1", "3" in "ID A1.3"`
                },
                {
                    symbol: `\\W`,
                    description: `Matches any non-word character.`,
                    pattern: `\\W`,
                    matches: `" ", "." in "ID A1.3"`
                },
                {
                    symbol: `\\s`,
                    description: `	Matches any white-space character.`,
                    pattern: `\\w\\s`,
                    matches: `" _" in "int __ctr"`
                },
                {
                    symbol: `\\S`,
                    description: `Matches any non-white-space character.`,
                    pattern: `\\s\\S`,
                    matches: `" _" in "int __ctr"`
                },
                {
                    symbol: `\\d`,
                    description: `Matches any decimal digit.`,
                    pattern: `\\d`,
                    matches: `"4" in "4 = IV"`
                },
                {
                    symbol: `\\D`,
                    description: `Matches any character other than a decimal digit.`,
                    pattern: `\\D`,
                    matches: `" ", "=", " ", "I", "V" in "4 = IV"`
                }
            ]
        },
        Anchors: {
            name: 'Anchors',
            description: '',
            items: [
                {
                    symbol: `^`,
                    description: `By default, the match must start at the beginning of the string; in multiline mode, it must start at the beginning of the line.`,
                    pattern: `^\\d{3}`,
                    matches: `"901" in "901-333-"`
                },
                {
                    symbol: `$`,
                    description: `By default, the match must occur at the end of the string or before <code>\\n</code> at the end of the string; in multiline mode, it must occur before the end of the line or before <code>\\n</code> at the end of the line.`,
                    pattern: `-\\d{3}$`,
                    matches: `"-333" in "-901-333"`
                },
                {
                    symbol: `\\A`,
                    description: `The match must occur at the start of the string.`,
                    pattern: `\\A\\d{3}`,
                    matches: `"901" in "901-333-"`
                },
                {
                    symbol: `\\Z`,
                    description: `The match must occur at the end of the string or before <code>\\n</code> at the end of the string.`,
                    pattern: `-\\d{3}\\Z`,
                    matches: `"-333" in "-901-333"`
                },
                {
                    symbol: `\\z`,
                    description: `The match must occur at the end of the string.`,
                    pattern: `-\\d{3}\\z`,
                    matches: `"-333" in "-901-333"`
                },
                {
                    symbol: `\\G`,
                    description: `The match must occur at the point where the previous match ended, or if there was no previous match, at the position in the string where matching started.`,
                    pattern: `\\G\\(\\d\\)`,
                    matches: `"(1)", "(3)", "(5)" in "(1)(3)(5)[7](9)"`
                },
                {
                    symbol: `\\b`,
                    description: `The match must occur on a boundary between a <code>\\w</code> (alphanumeric) and a <code>\\W</code> (nonalphanumeric) character.`,
                    pattern: `\\b\\w+\\s\\w+\\b`,
                    matches: `"them theme", "them them" in "them theme them them"`
                },
                {
                    symbol: `\\B`,
                    description: `The match must not occur on a <code>\\b</code> boundary.`,
                    pattern: `\\Bend\\w*\\b`,
                    matches: `"ends", "ender" in "end sends endure lender"`
                },
            ]
        },
        Quantifiers: {
            name: 'Quantifiers',
            description: '',
            items: [
                {
                    symbol: `*`,
                    description: `Matches the previous element <code>zero</code> or <code>more</code> times.`,
                    pattern: `a.*c`,
                    matches: `"abcbc" in "abcbc"`
                },
                {
                    symbol: `+`,
                    description: `Matches the previous element <code>one</code> or <code>more</code> times.`,
                    pattern: `"be+"`,
                    matches: `"bee" in "been", "be" in "bent"`
                },
                {
                    symbol: `?`,
                    description: `Matches the previous element <code>zero</code> or <code>one</code> time.`,
                    pattern: `"rai?"`,
                    matches: `"rai" in "rain"`
                },
                {
                    symbol: `{ n }`,
                    description: `Matches the previous element exactly <code>n</code> times.`,
                    pattern: `",\\d{3}"`,
                    matches: `",043" in "1,043.6", ",876", ",543", and ",210" in "9,876,543,210"`
                },
                {
                    symbol: `{ n ,}`,
                    description: `Matches the previous element at least <code>n</code> times.`,
                    pattern: `"\\d{2,}"`,
                    matches: `"166", "29", "1930"`
                },
                {
                    symbol: `{ n , m }`,
                    description: `Matches the previous element at least <code>n</code> times, but no more than <code>m</code> times.`,
                    pattern: `"\\d{3,5}"`,
                    matches: `"19302" in "193024"`
                },
                {
                    symbol: `*?`,
                    description: `Matches the previous element <code>zero</code> or <code>more</code> times, but as few times as possible.`,
                    pattern: `a.*?c`,
                    matches: `"abc" in "abcbc"`
                },
                {
                    symbol: `+?`,
                    description: `Matches the previous element <code>one</code> or <code>more</code> times, but as few times as possible.`,
                    pattern: `"be+?"`,
                    matches: `"be" in "been", "be" in "bent"`
                },
                {
                    symbol: `??`,
                    description: `Matches the previous element <code>zero</code> or <code>one</code> time, but as few times as possible.`,
                    pattern: `"rai??"`,
                    matches: `"ra" in "rain"`
                },
                {
                    symbol: `{ n }?`,
                    description: `Matches the preceding element exactly <code>n</code> times.`,
                    pattern: `",\\d{3}?"`,
                    matches: `",043" in "1,043.6", ",876", ",543", and ",210" in "9,876,543,210"`
                },
                {
                    symbol: `{ n ,}?`,
                    description: `Matches the previous element at least <code>n</code> times, but as few times as possible.`,
                    pattern: `"\\d{2,}?"`,
                    matches: `"166", "29", "1930"`
                },
                {
                    symbol: `{ n , m }?`,
                    description: `Matches the previous element between <code>n</code> and <code>m</code> times, but as few times as possible.`,
                    pattern: `"\\d{3,5}?"`,
                    matches: `"193", "024" in "193024"`
                },
            ]
        }
    }
}

const RegexDemonstration = {
    items: [
        {
            name: `Chinese`,
            demonstration: `<code>[\\u4e00-\\u9fa5]{0,}</code>`
        },
        {
            name: ``,
            demonstration: `<code></code>`
        },
        {
            name: ``,
            demonstration: `<code></code>`
        },
        {
            name: ``,
            demonstration: `<code></code>`
        },
        {
            name: ``,
            demonstration: `<code></code>`
        },
        {
            name: ``,
            demonstration: `<code></code>`
        },
        {
            name: ``,
            demonstration: `<code></code>`
        },
        {
            name: ``,
            demonstration: `<code></code>`
        },
        {
            name: ``,
            demonstration: `<code></code>`
        },
        {
            name: ``,
            demonstration: `<code></code>`
        },
        {
            name: ``,
            demonstration: `<code></code>`
        },
        {
            name: ``,
            demonstration: `<code></code>`
        },
    ]
}

export { RegexDescription, RegexDemonstration }