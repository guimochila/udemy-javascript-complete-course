// Lecture: let and const

// ES5 - Function scope
var name5 = 'James Smith';
var age5 = 23;
name5 = 'James Miller';

console.log(name5);

// ES6 - Block scope
const name6 = 'James Smith';
let age6 = 23;
name6 = 'James Miller';

console.log(name6);

// ES5

function driversLicense(passedTest){
    if (passedTest){
        var firstName = 'John';
        var yearOfBirth = 1990; 
    }

    console.log(firstName + ', born in ' + yearOfBirth + ' is allowed to drive');
}

driversLicense(true);

// ES6

function driversLicense6(passedTest){
    let firstName;
    const yearOfBirth = 1990;

    if (passedTest){
        firstName = 'John';
    }

    console.log(firstName + ', born in ' + yearOfBirth + ' is allowed to drive'); 
}

driversLicense6(true);