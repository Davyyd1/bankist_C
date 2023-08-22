'use strict';


// const checkDogs = function(dogsJulia, dogsKate) {
//     const dogsJuliaCorrected = dogsJulia.slice();
//     dogsJuliaCorrected.splice(0,1);
//     const fullArr = [...dogsJuliaCorrected,...dogsKate];
//     fullArr.forEach(function(dog, i){
//         if(dog >= 3 ){
//             console.log(`Dog number ${i} is an adult and has ${dog} years old`);
//         } 
//         if(dog < 3) {
//             console.log(`Dog number ${i} is a puppy ${dog} years old`);
//         }
//     })
// }

// checkDogs([3, 5, 2, 12, 7],  [4, 1, 15, 8, 3]);

// const calcAverageHumanAge = function (ages) {
//     const humanAges = ages.map(age => age <= 2 ? 2*age : 16+age*4);
//     console.log(humanAges);
//     const adults = humanAges.filter((cur) => cur >= 18)
//     console.log(humanAges);
//     console.log(adults);
//     const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
//     return average
// }

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])
// console.log(avg1, avg2);

