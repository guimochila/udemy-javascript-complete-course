* Every Javascript object has a prototype property, which makes inheritance possible in Javascript.
* The prototype property of an object is where we put methods and properties that we want the other objects to inherit.
* The Constructor's prototype property is NOT the prototype of the Constructor itself, it's the prototype of ALL instances that are created through it.
* When a certain method (or property) is called, the search starts in the object itself, and it can not be found, the search moves on to the object's prototype. This continues until is found: prototype chain.