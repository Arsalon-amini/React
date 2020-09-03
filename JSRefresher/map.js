const colors = ["red", "blue", "green"];

const items = colors.map(function (color) {
  return "<li>" + color + "<li>";
});

//Arrow syntax
const items = colors.map((color) => "<li>" + color + "<li>");
const items = colors.map(color => `<li>${color}<li>`); //template literal

console.log(items);
