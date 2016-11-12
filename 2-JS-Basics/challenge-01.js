// Code Challenge - 01 

var p1_height = 165;
var p1_age = 23;

var p2_height = 165;
var p2_age = 21;

var p3_height = 165;
var p3_age = 24;

var p1_score = p1_height + (p1_age * 5);
var p2_score = p2_height + (p2_age * 5);
var p3_score = p3_height + (p3_age * 5);

if (p1_score > p2_score && p1_score > p3_score){
    console.log('Player 1 won');
} else if ( p2_score > p1_score && p2_score > p3_score) {
    console.log('Player 2 won');
} else if ( p3_score > p1_score && p3_score > p2_score) {
    console.log('Player 3 won');
} else {
    console.log('Draw');
}