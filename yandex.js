const metrikaWrapper = function(callback){
    const DateToString = (date) => date.getFullYear() +
        '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) +
        '-' + (date.getDate() < 10 ? '0' + (date.getDate()) : (date.getDate()))

    return (user) => {
        if (user?.login && user?.password && user?.date) {
            let currStatDay = this.statDays?.find(statDay => statDay.date === DateToString(user.date))
            let isUser = !!this.users?.find(u => u.date === DateToString(user.date) && u.login === user.login && u.password === user.password)
            if (currStatDay) {
                if (!isUser) {
                    if (!this.users)
                        this.users = []
                    this.users.push(user)
                    currStatDay.users += 1
                    callback()
                }
            }
            else {
                if (!this.statDays)
                    this.statDays = []
                this.statDays.push({ date: DateToString(user.date), users: 1 })
                if (!isUser) {
                    if (!this.users)
                        this.users = []
                    this.users.push(user)
                }
                callback()
            }
        }
        return this.statDays
    }
}

// const wrappedFunc = metrikaWrapper(() => (console.log('called')));

// console.log(wrappedFunc({ login: 'a', password: 'a', date: new Date('2023-06-28') }).forEach(a => console.log(a)));

// console.log(wrappedFunc({ login: NaN, password: 'a', date: new Date('2023-06-28') }).forEach(a => console.log(a)));

// console.log(wrappedFunc({ login: 'c', date: new Date('2023-06-28') }).forEach(a => console.log(a)));

// console.log('');

const wrappedFunc2 = metrikaWrapper(() => (console.log('called')));

console.log(wrappedFunc2({ login: 'a', password: 'a', date: new Date('2023-06-28') }));

console.log(wrappedFunc2({ login: 'b', password: 'a', date: new Date('2023-06-28') }));

console.log(wrappedFunc2({ login: 'c', password: 'c', date: new Date('2023-06-28') }));