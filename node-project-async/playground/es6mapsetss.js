let cardAce = {
  name: 'Ace of Spades'
};

let cardKing = {
  name: 'King of Clubs'
};

// let deck = new Map([['as', cardAce], ['kc', cardKing]]);
let deck = new Map();
deck.set('as', cardAce);
deck.set('kc', cardKing);

console.log(deck.get('as'));

for (let entry of deck) {
  console.log(entry);
}

let key1 = {a:1};
let key2 = {b:2};

let deck2 = new WeakMap();
deck2.set(key1, cardAce);
deck2.set(key2, cardKing);

console.log(deck2.get(key2));

let set1 = new Set([1, 1, 1]);
set1.add(2);
set1.delete(1);
console.log(set1.has(1));

for (element of set1) {
  console.log(element);
}

for (element of set1.entries()) {
  console.log(element);
}

for (element of set1.keys()) {
  console.log(element);
}

for (element of set1.values()) {
  console.log(element);
}

set1.clear();

let a = {a:1};
let b = {b:2};

let set2 = new WeakSet([a, b, b]);

console.log(set2.has(b));

set2.add(a);

set2.delete(b);

console.log(set2.has(b));
