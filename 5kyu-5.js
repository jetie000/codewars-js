function humanReadable (seconds) {
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor((seconds - hours * 3600)/60)
    let seconds1 = seconds - hours * 3600 - minutes * 60
    return (hours < 10 ? '0': '') + hours+':'+(minutes < 10 ? '0': '')+minutes+':'+(seconds1 < 10 ? '0': '')+seconds1;
}

console.log(humanReadable(86399));