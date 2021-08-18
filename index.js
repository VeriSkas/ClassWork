// const buttons = document.getElementsByTagName('button');
// let counter = () => {
//     let a = 0;
//     return () => {
//         a++;
//         return a;
//     };
// };

// for (let index = 0; index < buttons.length; index++) {
//     const btnCounter = counter();
//     buttons[index].onclick = () => {
//         buttons[index].innerText = btnCounter();;
//     }
// };


// const user = {
//     name:'Alex',
//     age: 31
// };

// const arr = [1, 2, 3]

// Object.prototype.sayHello = function() {  // прописанные функции для обжект, применятся и к др(аррэй наример)
//     console.log(this.name)
// };

// user.sayHello();

// const user2 = {
//     name:'Misha',
//     age: 29
// };

// user2.sayHello();
// console.log(user2.__proto__);













// const counter = () => {
//     let a = 0;
//     return () => a++;
// }

// const counter1 = counter();

// console.log(counter1());


const gasilov = {
    name: 'Mikhail',
    age: 29,
    // sayAbout() {
    //     console.log(`My name is ${this.name}. Im ${this.age} y.o.`);
    // }
    sayHello() {
        console.log(`Hello ${this.name}`);
    }
}

const kot = {
    name: 'Sahsa',
    age: 30,
    // sayAbout() {
    //     console.log(`My name is ${this.name}. Im ${this.age} y.o.`);
    // }
}

const sinkevich = {
    name: 'Vitaliy',
    age: 29,
    // sayAbout() {
    //     console.log(`My name is ${this.name}. Im ${this.age} y.o.`);
    // }
}


// Object.prototype.sayAbout = function() {
    //     console.log(`My name is ${this.name}. Im ${this.age} y.o.`);
    // }
    
    // const sayAbout = function(job) {
        //     console.log(`My name is ${this.name}. Im ${this.age} y.o.`);
        //     console.log(`Job: ${job}`);
        // }
        
        
        // gasilov.sayAbout();
        // sinkevich.sayAbout();
        // kot.sayAbout();

        
// sayAbout.bind(gasilov, 'frontend')(); // bind передает контест для функции sayAbout или sayAbout.bind(gasilov)('frontend');


// const showGasilovInfo = sayAbout.bind(gasilov, 'frontend');

// setTimeout( () => {
//     showGasilovInfo();
// }, 2000)

// sayAbout.call(gasilov, 'frontend'); //  привязывает контекст и вызывает метод...когда знаем количество аргументов
// gasilov.sayHello.call(sinkevich);


// const sayAbout = function(job, salary) {
    //     console.log(`My name is ${this.name}. Im ${this.age} y.o.`);
//     console.log(`Job: ${job}. Salary: ${salary}`);
// }
// sayAbout.apply(gasilov, ['frontend', 0]);  // то же что call, только передается массив с параметрами...когда не знаем кол-во аргументов

const first = function() {
    var x = 0;
    if(!x) {
        var x = 1;
        console.log(x);
    }
    console.log(x);
}

first()
