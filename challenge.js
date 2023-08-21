'use strict';


const checkDogs = function(dogsJulia, dogsKate) {
    const dogsJuliaCorrected = dogsJulia.slice();
    dogsJuliaCorrected.splice(0,1);
    const fullArr = [...dogsJuliaCorrected,...dogsKate];
    fullArr.forEach(function(dog, i){
        if(dog >= 3 ){
            console.log(`Dog number ${i} is an adult and has ${dog} years old`);
        } 
        if(dog < 3) {
            console.log(`Dog number ${i} is a puppy ${dog} years old`);
        }
    })
}

checkDogs([3, 5, 2, 12, 7],  [4, 1, 15, 8, 3]);