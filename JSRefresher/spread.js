//Arrays
const first = [1, 2, 3, 4];
const second = [5, 6, 7, 8];

const combined = first.concat(second); //old way
const combined = [...first, "a", ...second, "b"]; //spread operator

const clone = [...first]; //clone using spread operator
console.log(combined);

//Objects

const first = { name: "Arsi" };
const second = { profession: "Software Engineer I", location: "Tainan" };

const combined = { ...first, ...second };
const clone = { ...first };

console.log(combined);
console.log(clone);
