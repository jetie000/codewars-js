function luckCheck(ticket) {
    if (isNaN(ticket) || ticket === '' || ticket.trim() !== ticket)
        throw "error"
    return ticket.slice(0, Math.floor(ticket.length / 2)).split('').map(el => Number(el)).reduce((acc, el) => acc + el, 0) ===
        ticket.slice(Math.ceil(ticket.length / 2), ticket.length).split('').map(el => Number(el)).reduce((acc, el) => acc + el, 0)
}

console.log(luckCheck('683179'));

// In some countries of former Soviet Union there was a belief about lucky tickets. 
// A transport ticket of any sort was believed to posess luck if sum of digits on the left half of 
// its number was equal to the sum of digits on the right half. Here are examples of such numbers:

// 003111    #             3 = 1 + 1 + 1
// 813372    #     8 + 1 + 3 = 3 + 7 + 2