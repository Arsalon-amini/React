function demo() {
  for (var i = 0; i < 10; i++) {
    console.log(i);
  }
  console.log("function scope" + i); //accessible outside for-loop block
}

function demo() {
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
  console.log("block scope" + i); //NOT accessible outside block declared
}

const x = 8;
x = 10; //cannot re-assign a constant (read only)

let x = 8;
x = 10; //can re-assign (read/write)
