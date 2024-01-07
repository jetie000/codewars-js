function rectangleRotation(a, b) {
    return (Math.floor(a / 2 / Math.sqrt(2)) * 2 + 1) * (Math.floor(b / 2 / Math.sqrt(2)) * 2 + 1) + (Math.floor((a / 2 + Math.sqrt(2) / 2) / Math.sqrt(2)) * 2) * (Math.floor((b / 2 + Math.sqrt(2) / 2) / Math.sqrt(2)) * 2)
}

console.log(rectangleRotation(6, 4));
console.log(rectangleRotation(30, 2));
console.log(rectangleRotation(8, 6));
console.log(rectangleRotation(16, 20));
// A rectangle with sides equal to even integers a and b is drawn on the Cartesian plane.
//  ts center (the intersection point of its diagonals) coincides with the point (0, 0), but the sides of
//  the rectangle are not parallel to the axes; instead, they are forming 45 degree angles with the axes.