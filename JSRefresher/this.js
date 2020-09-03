const person = {
  name: "Arsi",
  talk() {
    console.log(this); //references current obj
  },
};

person.talk();

const talk = person.talk.bind(person); //returns new instance of person, sets .this to point to that obj
talk();

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
