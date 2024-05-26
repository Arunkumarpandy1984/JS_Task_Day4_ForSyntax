const fs = require("fs");

function isObject(variable) {
  return (
    variable !== null && typeof variable === "object"
    // && !Array.isArray(variable)
  );
}

function printObjectUsingFor(object, indent) {
  // Extract keys of the object using Object.keys() method
  const keys = Object.keys(object); //Running through the json object Keys using for loop
  for (let i = 0; i < keys.length; ++i) {
    if (isObject(object[keys[i]])) {
      printObjectUsingFor(object[keys[i]], indent + "  ");
    } else {
      console.log(`${indent}key : ${keys[i]}, value : ${object[keys[i]]}`);
    }
  }
}

function printObjectUsingForIn(object, indent) {
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      if (isObject(object[key])) {
        printObjectUsingForIn(object[key], indent + "  ");
      } else {
        console.log(`${indent}key : ${key}, value : ${object[key]}`);
      }
    }
  }
}

function printObjectUsingForOf(object, indent) {
  for (let [key, value] of Object.entries(object)) {
    if (isObject(value)) {
      printObjectUsingForOf(value, indent + "  ");
    } else {
      console.log(`${indent}key : ${key}, value : ${value}`);
    }
  }
}

function printObjectUsingForEach(object, indent) {
  Object.entries(object).forEach(([key, value]) => {
    console.log(key + ": " + value);
  });
}

try {
  const data = fs.readFileSync("./resume.json", "utf8");
  let jsonData = JSON.parse(data);
  console.log(typeof jsonData); // jsonData is a object.
  // Using for loop.
  //printObjectUsingFor(jsonData, "");
  //printObjectUsingForIn(jsonData, "");
  //printObjectUsingForOf(jsonData, "");
  printObjectUsingForEach(jsonData, "");
} catch (err) {
  console.error("Error reading file:", err);
}
