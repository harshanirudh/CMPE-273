'use strict';
class Vehicle {
    constructor() {
        
    }
    drive() {
        console.log('Driving Generic Vehicle')
    }

};
class Car extends Vehicle {
    constructor(model, color) {
        super();
        this.model = model;
        this.color = color;
    }
    drive() {
        console.log(`Driving Car ${this.model}, ${this.color} color`);
    }
};
class Bike extends Vehicle {
    constructor(model, color) {
        super();
        this.model = model;
        this.color = color;
    }
    drive() {
        console.log(`Driving ${this.model}, ${this.color} color `);
    }
}
let a = new Vehicle();
let b = new Car('Tesla Model X', 'red'); // Car drive method overrides parent class vehicle method drive
let c = new Bike('Ducati', 'Black');// Bike Drive method overrides parent class vehicle method drive

a.drive();
b.drive();
c.drive();
// 6.(a) call apply bind
var calculateVehicleTax= function (cost,taxPercent){
    var tax=(cost*taxPercent)/100
    console.log(`tax for ${this.model} is \$${tax}`);
}
calculateVehicleTax.call(b,100000,10);
calculateVehicleTax.apply(b,[150000,15]);
var bindObj=calculateVehicleTax.bind(c);
bindObj(200000,20);
