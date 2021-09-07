'use strict';
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
let readFileAsyncAwait = (fileName) => {
    setTimeout(() => {
        console.log(`File reading done via async await for ${fileName}`)
    }, 2000)
}

let asyncAwaitExample = async () => {
    await readFileAsyncAwait('1.txt');
    await readFileAsyncAwait('2.txt');
    await readFileAsyncAwait('3.txt');
}


    callbackHell();
    promiseExample();
    asyncAwaitExample();
