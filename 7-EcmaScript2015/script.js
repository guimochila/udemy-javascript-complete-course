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

//////////////////////////////
// Lecture: Blocks and IIFEs

{
    const a = 1;
    let b   = 2;
}

console.log( a + b );

// ES5
(function () {
    var c = 3;
})();
console.log(c); */

//////////////////////////////
// Lecture: Strings

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2016 - year;
}

// ES5
console.log('This is ' + firstName + ' ' + lastName + 
    '. Born in ' + yearOfBirth + 
    '. He is ' + calcAge(yearOfBirth));

// ES6
console.log(`This is ${firstName} ${lastName}. Born in ${yearOfBirth}. He is ${calcAge(yearOfBirth)}`);

const n = `${firstName} ${lastName}`;
console.log(n);
console.log(n.startsWith('j'));
console.log(n.endsWith('th'));
console.log(n.includes(' '));
console.log(n.repeat(3)); 

//////////////////////////////
// Lecture: Arrow functions

const years = [1990 , 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el) {
    return 2016 - el;
});
console.log(ages5);

// ES6
let ages6 = years.map(el => 2016 - el);
console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
console.log(ages6);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`;
});

console.log(ages6);

//////////////////////////////
// Lecture: Arrow functions 2

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        var self = this;
        document.querySelector('.green').addEventListener('click', function () {
            alert('Box number ' + self.position + ', color: ' + self.color);
        });
    }
}
box5.clickMe();

// ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            alert('Box number ' + this.position + ', color: ' + this.color);
        });
    }
}
box6.clickMe();

function Person(name) {
    this.name = name;
}
//ES5
Person.prototype.myFriends5 = function(friends) {
    var arr = friends.map(function(el) {
        return this.name + ' is friends with ' + el
    }.bind(this));

    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);

//ES6
Person.prototype.myFriends6 = function(friends) {
    var arr = friends.map((el) => `${this.name}  is friends with ${el}`);
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends6(friends);*/

//////////////////////////////
// Lecture: Arrow functions 2

//ES5
var john = ['John', 26];
var name = john[0];
var age = john[1];

//ES6
const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const {firstName, lastName} = obj;
console.log(firstName);
console.log(lastName);

const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b);

function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age, retirement] = calcAgeRetirement(1990);
console.log(age);
console.log(retirement);

//////////////////////////////
// Lecture: Arrays

const boxes = document.querySelectorAll('.box');
console.log(boxes);

//ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(el){
    el.style.backgroundColor = 'dodgerblue';
});

//ES6
const boxesArr6 = Array.from(boxes);
Array.from(boxes).forEach(el => el.style.backgroundColor = 'dodgerblue');

//ES5

for(var i = 0; i < boxesArr5.length; i++){
    if(boxesArr5[i].className === 'box blue'){
        continue;
    }

    boxesArr5[i].textContent = 'I changed to blue';
}

//ES6
for (const el of boxesArr6){
    if (el.className.includes('blue')) {
        continue
    }
    el.textContent = 'I changed to blue';
}

//ES5
var ages = [12, 17, 8, 21, 14, 11];
var full = ages.map(function(el) {
    return el >=18;
});
console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

//ES6
console.log(ages.findIndex(el => el >= 18));
console.log(ages.find(el => el >= 18));

//////////////////////////////
// Lecture: Spread operator

function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

// ES5
var ages = [ 18, 30, 12, 21 ];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

// ES6
const sum3 = addFourAges(...ages);
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, ...familyMiller];

console.log(bigFamily);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];

Array.from(all).forEach(el => el.style.color = 'purple');


//////////////////////////////
// Lecture: Rest operator

// ES5
function isFullAge5() {
    console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments);
    console.log(argsArr);

    argsArr.forEach(function (el) {
        console.log((2016 - el) >= 18);
    });
}

isFullAge5(1990, 1999, 1965);
isFullAge5(1990, 1999, 1965, 2016, 1987);


//ES6
function isFullAge6(...years){
    console.log(years);
    years.forEach(el => console.log((2016 -el) >= 18));
}
isFullAge6(1990, 1999, 1965);
isFullAge6(1990, 1999, 1965, 2016, 1987);

// ES5
function isFullAge5(limit) {
    console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments, 1);
    console.log(argsArr);

    argsArr.forEach(function (el) {
        console.log((2016 - el) >= limit);
    });
}

isFullAge5(18, 1990, 1999, 1965);
isFullAge5(1990, 1999, 1965, 2016, 1987);

//ES6
function isFullAge6(limit, ...years){
    console.log(years);
    years.forEach(el => console.log((2016 -el) >= limit));
}
isFullAge6(21, 1990, 1999, 1965);
isFullAge6(1990, 1999, 1965, 2016, 1987);


//////////////////////////////
// Lecture: Default parameters

//ES5

function SmithPerson(firstName, yearOfBirth, lastName, nationality){
    this.firstName = firstName;
    this.lastName = lastName || 'Smith';
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality || 'American';
}

//ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American'){
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish'); */


//////////////////////////////
// Lecture: Maps

const question = new Map();
question.set('question', 'What is name?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2016');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer');
question.set(false, 'Wrong, please try again!');

console.log(question.get('question'));
console.log(question.size);

if (question.has(4)){
    question.delete(4);
    console.log('Answer 4 is here');
}
question.clear();

question.forEach((v, k) => console.log(`Key: ${k}, value: ${v}`));

for (let [key, value] of question.entries()) {
    if (typeof(key) === 'number'){
          console.log(`Key: ${key}, value: ${value}`);
    } 
}

const ans = parseInt(prompt('Write the correct answer'));
console.log(question.get(ans === question.get('correct')));

//////////////////////////////
// Lecture: Classes

//ES5
var Person5 = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function () {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('John', 1900, 'teacher');

//ES6
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        return new Date().getFullYear() - this.yearOfBirth;
    }

    static greeting() {
        console.log('Hey there');
    }
}

const john6 = new Person6('John', 1990, 'teacher');
Person6.greeting();

//////////////////////////////
// Lecture: Sub Classes

//ES5
var Person5 = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function () {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athelete5 = function (name, yearOfBirth, job, olympicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}


Athelete5.prototype = Object.create(Person5.prototype);
Athelete5.prototype.wonMedal = function () {
    this.medals++;
    console.log(this.medals);
}

var johnAthlete = new Athelete5('John', 1990, 'swimmer', 3, 10);

johnAthlete.calculateAge();
johnAthlete.wonMedal();

//ES6
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        return new Date().getFullYear() - this.yearOfBirth;
    }

}

class Athelete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals){
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athelete6('John', 1990, 'swimmer', 3, 10);
johnAthlete6.wonMedal();
console.log(johnAthlete6.calculateAge());
