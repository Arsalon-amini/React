//JS fn (regular)
const square = function (number) {
  return number * number;
};

//single param (no parenthesis)
const square = (number) => {
  return number * number;
};

//no params (empty parenthesis)
const square = () => {
  return number * number;
};

//single line body (w/ return value - remove brackets, return keyword)
const square = () => number * number;

//arrow use
const jobs = [
  { id: 1, isActive: true },
  { id: 2, isActive: true },
  { id: 3, isActive: false },
];

//annonymous fn syntax (predicate -> filter criteria)
const activeJobs = jobs.filter(function (job) {
  return job.isActive;
});

//arrow syntax (predicate -> filter critera)
const activeJobs = jobs.filter((job) => job.isActive);

//.this keyword
const person = {
  talk() {
    console.log("this", this); //points to current obj (method inside obj calling .this)
  },
  walk() {
    setTimeout(function () {
      console.log("this", this); //points to window (global) obj bcuz .this part of a callback fn, not part of an obj method
    }, 1000);
  },
};

person.talk(); //called inside obj. method (references current obj)
person.walk(); //this -> called inside arrow fn (.this references global ob)

//soln (old days)
const person = {
  walk() {
    var self = this; //.this declared inside obj method vs. annon fn (ref current obj)
    setTimeout(function () {
      console.log("self", self); //references current object
    }, 1000);
  },
};

person.walk();

//soln (modern)
const person = {
  walk() {
    setTimeout(() => {
      console.log("this", this); //arrow fn syntax inherits .this in context which code is defined (obj)
    }, 1000);
  },
};

person.walk();
