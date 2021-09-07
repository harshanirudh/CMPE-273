'use strict';
//closure example
function calculator(arr,operation){
    // let size=arr.length;
    let sum=0;
    let product=0;
    let min;
    let max;
    function add(){
        sum=arr.reduce((x,y)=>x+y,0);
        return sum;
    }
    function mul(){
        product=arr.reduce((x,y)=>x*y);
        return product;
    }
    function findmin(){
        //Spread
        min=Math.min(...arr);
        return min;
    }
    function findmax(){
        //Spread
        max=Math.max(...arr)
        return max;
    }
    if(operation==='add')
        return add;
    else if(operation==='min')
        return findmin;
    else if(operation==='max')
        return findmax;
    else if(operation==='mul')
        return mul;
    else 
        throw 'Invalid operation';
}
let inputArr=[1,2,3,4]
let operaotor='add';
let innerFun=calculator(inputArr,operaotor);
console.log('Output of addition '+innerFun());

operaotor='mul';
innerFun=calculator(inputArr,operaotor);
console.log('Output of product of numbers '+innerFun());

operaotor='min';
innerFun=calculator(inputArr,operaotor);
console.log('Output of min of array '+innerFun());

operaotor='max';
innerFun=calculator(inputArr,operaotor);
console.log('Output of max of array '+innerFun());