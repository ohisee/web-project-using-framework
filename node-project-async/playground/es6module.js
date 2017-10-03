export let keyValue = 1001;

export function test() {
  keyValue = 2000;
  return 'tested';
}

let ab = 'Some text';

export default ab;

// or
// export {keyValue, test};