// var generateName = require("sillyname");
//we can rather use import for using npm rather than using the require function
// import generateName from "sillyname";

// var sillyName = generateName();
// console.log(`My name is ${sillyName}.`);

import superheroes from "superheroes"

const name = superheroes.random();
console.log(`I am ${name}!`);