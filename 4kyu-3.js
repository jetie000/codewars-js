function solution(list) {
    let resp = ''
    let temp
    for (let i = 0; i < list.length; i++) {
        if (list[i - 1] !== list[i] - 1)
            temp = list[i];
        if (list[i + 1] !== list[i] + 1)
            if (temp === list[i])
                resp += list[i] + ','
            else if (temp + 1 === list[i])
                resp += temp + ',' + list[i] + ','
            else
                resp += temp + '-' + list[i] + ','
    }
    return resp.slice(0, -1);
}

console.log(solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]));

// A format for expressing an ordered list of integers is to use a comma separated list of either

// solution([-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
// returns "-10--8,-6,-3-1,3-5,7-11,14,15,17-20"