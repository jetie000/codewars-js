function generateBC(url, separator) {
    let parts = url.match(/\/+[a-zA-Z-\.]+/g);
    if(!parts)
        return '<span active="/">HOME</span>'
    if (parts[parts.length - 1].includes('index'))
        parts.pop()
    if (parts[0].includes('//'))
        parts.shift()
    let ignore = ["the", "of", "in", "from", "by", "with", "and", "or", "for", "to", "at", "a"]
    let link = '/'
    let resp = parts.length === 0 ? '<span class="active">HOME</span>' + separator :'<a href="/">HOME</a>' + separator
    for (let i = 0; i < parts.length - 1; i++) {
        link += parts[i].slice(1) + '/'
        let linkCap = parts[i].slice(1).length > 30 ?
            parts[i].match(/[a-zA-z]+/g).filter(el => !ignore.find(el2 => el2 === el.toLowerCase())).map(el => el[0].toUpperCase()).join('') :
            parts[i].slice(1).match(/[a-zA-Z]+/g).join(' ').toUpperCase();
        resp += '<a href="' + link + '">' + linkCap + '</a>' + separator
    }
    if (parts[parts.length - 1]) {
        let endCap = parts[parts.length - 1].slice(1).length > 30 ?
            parts[parts.length - 1].split('.')[0].match(/[a-zA-z]+/g).filter(el => !ignore.find(el2 => el2 === el.toLowerCase())).map(el => el[0].toUpperCase()).join('') :
            parts[parts.length - 1].split('.')[0].slice(1).match(/[a-zA-Z]+/g).join(' ').toUpperCase();
        resp += '<span class="active">' + endCap + '</span>'
    }
    else resp = resp.slice(0, -separator.length)
    return resp
}

console.log(generateBC("mysite.com/pictures/holidays.html", " : "));
console.log(generateBC("www.codewars.com/users/GiacomoSorbi", " / "));
console.log(generateBC("www.microsoft.com/important/confidential/docs/index.htm#top", " * "));
console.log(generateBC("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.asp", " > "));
console.log(generateBC("www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi", " + "));
console.log(generateBC('agcpartners.co.uk/test.php?hack=off', ' # '));
console.log(generateBC('codewars.com', ' : '));
// What might not be so trivial is instead to get a decent breadcrumb from your current url.
// For this kata, your purpose is to create a function that takes a url, strips the first part
// (labelling it always HOME) and then builds it making each element but the last a <a> element
// linking to the relevant path; last has to be a <span> element getting the active class.
