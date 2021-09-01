// b. to demonstrate difference between var,let and const

var helloVar = "Hi from Var";
var helloVar = "Hi redeclaring var, This will not throw error"
console.log(helloVar);
let helloLet = "Hi from let";
// let helloLet="Hi Redeclaring let, this will throw a error"
console.log(helloLet);
const helloConst = "Hi from const"
// helloConst="changing const variable is restricted,this will throw a error"
console.log(helloConst);

function counterVar() {
    for (var count = 0; count < 3; count++) {
        console.log(count);
    }
    console.log(`outside blockscope ${count}`);

}
function counterLet() {
    for (let count = 0; count < 3; count++) {
        console.log(count);
    }
    //This will throw error as let is block scoped unlike var which is function scope
    // console.log(`outside blockscope ${count}`);

}

counterVar();
counterLet();
//----------------------------------------------------------
// (c) callback,promise & async await
// to simulate fileread
let readFileCallBack = (fileName) => {
    setTimeout(
        () => {
            console.log(`File reading done via callback for ${fileName}`)
        }, 2000
    )
}

//callback hell
let callbackHell = () => {
    readFileCallBack('1.txt',
        readFileCallBack('2.txt',
            readFileCallBack('3.txt')
        )
    );
}
//----------------

let readFilePromise = (fileName) => {
    return new Promise((resolve, reject) => {
        setTimeout(
            () => {
                console.log(`File reading done via promise for ${fileName}`);
                resolve();
            }, 2000
            )
        })
    }
    let promiseExample = () => {
        readFilePromise('1.txt')
        .then(() => readFilePromise('2.txt')).catch((errorMsg) => { console.log(errorMsg) })
        .then(() => readFilePromise('3.txt')).catch((errorMsg) => { console.log(errorMsg) })
    }
    
    
    
    //--------------------------
    let readFileAsyncAwait=(fileName)=>{
        setTimeout(()=>{
            console.log(`File reading done via async await for ${fileName}`)
        },2000)
    }
    
    let asyncAwaitExample= async ()=>{
        await readFileAsyncAwait('1.txt');
        await readFileAsyncAwait('2.txt');
        await readFileAsyncAwait('3.txt');
    }


    callbackHell();
    promiseExample();
    asyncAwaitExample();
    