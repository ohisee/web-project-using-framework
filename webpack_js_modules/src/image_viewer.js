import big from './assets/big.jpg';
import small from './assets/small.jpg';
//import '../styles/image_viewer.css'; // moved to index.js

export default () => {
  const image = document.createElement('img');
  //image.src = 'http://lorempixel.com/400/400';
  image.className = 'imageBorder';
  image.src = small;
  document.body.appendChild(image);

  const bigImage = document.createElement('img');
  //image.src = 'http://lorempixel.com/400/400';
  bigImage.className = 'imageBorder';
  bigImage.src = big;
  document.body.appendChild(bigImage);
};
