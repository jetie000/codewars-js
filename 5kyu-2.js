function pickPeaks(arr) {
    let arrResp = {
        pos: [],
        peaks: []
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr[i - 1])
            continue;
        let offsetL = 1, offsetR = 1;
        let isPeakL = false, isPeakR = false;
        while (arr[i - offsetL] !== undefined && arr[i + offsetR] !== undefined) {
            if (isPeakL && isPeakR)
                break;
            if (arr[i - offsetL] < arr[i])
                isPeakL = true
            if (arr[i + offsetR] < arr[i])
                isPeakR = true
            if (arr[i - offsetL] > arr[i] || arr[i + offsetR] > arr[i])
                break;
            if (!isPeakL)
                offsetL++;
            if (!isPeakR)
                offsetR++
        }
        if (isPeakL && isPeakR) {
            arrResp.peaks.push(arr[i])
            arrResp.pos.push(i)
        }
    }
    return arrResp
}

console.log(pickPeaks([1, 2, 3, 6, 4, 1, 2, 3, 2, 1]));
console.log(pickPeaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3]));
console.log(pickPeaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 2, 2, 1]).pos);
console.log(pickPeaks([2, 1, 3, 1, 2, 2, 2, 2, 1]));
console.log(pickPeaks([2, 1, 3, 1, 2, 2, 2, 2]));
console.log(pickPeaks([2, 1, 3, 2, 2, 2, 2, 5, 6]));

// In this kata, you will write a function that returns the positions
// and the values of the "peaks" (or local maxima) of a numeric array.

// For example, the array arr = [0, 1, 2, 5, 1, 0] has a peak at
// position 3 with a value of 5 (since arr[3] equals 5).