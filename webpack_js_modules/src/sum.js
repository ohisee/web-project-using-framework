const sum = (a, b) => {
  return a + b;
};

//module.exports = sum; // using commonJS module

export default sum; // using ES2015 module

export class RRR {
  static randomInteger() {
    return Math.ceil(Math.random() * 100);
  }
}
