function printFullAge(years) {
    var ages = [];
    
    for (var i = 0; i < years.length; i++){
        ages.push(2016 - years[i]);
    }
    
    for (i = 0; i < ages.length; i++){
        if (ages[i] >= 18) {
            console.log('Person ' + (i + 1) + ' is ' + ages[i] + ' years old and is on full age');
            ages[i] = true;
        } else {
            console.log('Person ' + (i + 1) + ' is ' + ages[i] + ' years old and is NOT on full age');
            ages[i] = false;
        }
    }
    
    return ages;
}

var full_1 = printFullAge([ 1984, 1994, 2000 ]);
var full_2 = printFullAge([ 1954, 1964, 1991 ]);

console.log(full_1);
console.log(full_2);
