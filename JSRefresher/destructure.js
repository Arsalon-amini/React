const address = {
  street: "4444",
  city: "Tainan",
  state: "",
  country: "",
};

//repetative
const street = address.street;
const city = address.city;
const state = address.state;
const country = address.country;

//destructuring syntax (ES6)
const { street, city: ct, state, country } = address; //extracting street, city, etc from address obj storing in separate const
console.log(ct); //set const ct to city prop in address
