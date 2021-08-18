const buttons = document.getElementsByTagName('button');
let counter = () => {
    let a = 0;
    return () => {
        a++;
        return a;
    };
};

for (let index = 0; index < buttons.length; index++) {
    const btnCounter = counter();
    buttons[index].onclick = () => {
        buttons[index].innerText = btnCounter();;
    }
};


const user = {
    name:'Alex',
    age: 31
};

const arr = [1, 2, 3]

Object.prototype.sayHello = function() {  // прописанные функции для обжект, применятся и к др(аррэй наример)
    console.log(this.name)
};

user.sayHello();

const user2 = {
    name:'Misha',
    age: 29
};

user2.sayHello();
console.log(user2.__proto__);
