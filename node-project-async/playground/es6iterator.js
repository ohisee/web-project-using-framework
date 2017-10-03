let array = [1, 2, 3];

console.log(typeof array[Symbol.iterator]);

array[Symbol.iterator] = function() {
  let nextValue = 10;
  return {
    next: function() {
      nextValue++;
      return {
        done: nextValue > 15? true: false,
        value: nextValue
      };
    }
  };
}

// let it = array[Symbol.iterator]();

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

for (let element of array) {
  console.log(element);
}

let person = {
  name: 'Max',
  hobbies: ['Sports', 'Cooking'],
  [Symbol.iterator]: function() {
    let i = 0;
    let hobbies = this.hobbies;
    return {
      next: function() {
        let value = hobbies[i];
        i++;
        return {
          done: i > hobbies.length? true : false,
          value: value
        };
      }
    };
  }
};

for (let hobby of person) {
  console.log(hobby);
}

// generator
function *select() {
  yield 'House';
  yield 'Garage';
  yield 'Kitchen';
}

let gi = select();
console.log(gi.next());
console.log(gi.next());
console.log(gi.next());


let oobj = {
  [Symbol.iterator]: select
};

for (let el of oobj) {
  console.log(el);
}

function *gen(stop) {
  for (let i = 0; i < stop; i++) {
    try {
      yield i;
    } catch (e) {
      console.log(e);
    }
  }
}

let ii = gen(2);

console.log(ii.next());
console.log(ii.throw('an error occured'));
console.log(ii.return('returned'));
console.log(ii.next());


