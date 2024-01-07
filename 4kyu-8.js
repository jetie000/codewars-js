class User {
    rank
    progress

    constructor() {
        this.rank = -8
        this.progress = 0
    }

    incProgress(rankTask) {
        if (rankTask < -8 || rankTask > 8 || rankTask === 0)
            throw RangeError;
        if (this.rank === 8)
            return
        let rankDiff = (this.rank < 0 && rankTask > 0) ?
            (rankTask - this.rank - 1) :
            ((this.rank > 0 && rankTask < 0) ?
                (rankTask - this.rank + 1) :
                rankTask - this.rank)
        if (rankDiff <= -2)
            return
        if (rankDiff === -1)
            this.progress += 1
        if (rankDiff === 0)
            this.progress += 3
        if (rankDiff >= 1)
            this.progress += 10 * (rankDiff) * (rankDiff)
        if (this.progress >= 100) {
            while (this.progress >= 100) {
                this.rank += 1
                if (this.rank === 0)
                    this.rank += 1
                this.progress -= 100
                if (this.rank === 8)
                    this.progress = 0
            }
        }
    }
}

var user = new User()
console.log(user.rank) // => -8
console.log(user.progress) // => 0
user.incProgress(8)
// console.log(user.progress) // => 10
// user.incProgress(-5) // will add 90 progress
console.log(user.progress) // => 0  progress is now zero
console.log(user.rank) // => -7  rank was upgraded to -7


// Write a class called User that is used to calculate the amount that a user
// will progress through a ranking system similar to the one Codewars uses.

// Business Rules:
// A user starts at rank -8 and can progress all the way to 8.
// There is no 0 (zero) rank. The next rank after -1 is 1.
// Users will complete activities. These activities also have ranks.
// Each time the user completes a ranked activity the users rank progress is updated based off of the activity's rank
// The progress earned from the completed activity is relative to what the user's current rank is compared to the rank of the activity
// A user's rank progress starts off at zero, each time the progress reaches 100 the user's rank is upgraded to the next level
// Any remaining progress earned while in the previous rank will be applied towards the next rank's progress
// (we don't throw any progress away). The exception is if there is no other rank left to progress towards (Once you reach rank 8 there is no more progression).
// A user cannot progress beyond rank 8.
// The only acceptable range of rank values is -8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8. Any other value should raise an error.
// The progress is scored like so:

// Completing an activity that is ranked the same as that of the user's will be worth 3 points
// Completing an activity that is ranked one ranking lower than the user's will be worth 1 point
// Any activities completed that are ranking 2 levels or more lower than the user's ranking will be ignored
// Completing an activity ranked higher than the current user's rank will accelerate the rank progression.
// The greater the difference between rankings the more the progression will be increased. The formula is 10 * d * d where d equals the difference in ranking between the activity and the user.