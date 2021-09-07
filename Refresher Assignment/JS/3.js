// 3. Static methods
'use strict'
class Car{

    constructor(model,color,){
        this.model=model;
        this.color=color;
    }
    static createCar(model,color){
        return new Car(model,color);
    }
};

// console.log(Car.createCar('Tesla x','red'));
//----------------------------------------------
// 3. regular expression to check if given file is of .java extensions
// 2. Rest operaotor
// /\.java$/gm

let checkFileType=(...files) =>{
    let fileRegEx='\.java$'
    let regEx=new RegExp(fileRegEx,'g');
    for(let file of files)
        console.log(`is ${file} a java file ? ${regEx.test(file)}`)
    
}
checkFileType('Hello.java','hello.py','hello.java.world');