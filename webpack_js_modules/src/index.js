// const sum = require('./sum'); // using commonJS module
// import sum from './sum';
//import './image_viewer';

// const total = sum(10, 5);
// console.log(total);

import sum from './sum';
import { RRR } from './sum';

import 'jquery';
import '../styles/image_viewer.css';
import 'bootstrap/dist/css/bootstrap.css';

var ol = jQuery('<ol></ol>');
for (var i = 0; i < 10; i++) {
  ol.append(jQuery('<li></li>').text(i));
}
ol.append(jQuery('<li></li>').text('Random ' + RRR.randomInteger()));

const total = sum(33, 39);
ol.append($('<li></li>').text('Expected to see 72 ' + total));

const container = document.createElement('div');
container.className = 'container';

const button = document.createElement('button');
button.innerText = 'Click Button';
button.className = 'btn btn-primary';
button.onclick = () => {
  System.import('./image_viewer').then((module) => {
    module.default();
  });
};

$('body').append(ol);
container.appendChild(button);
document.body.appendChild(container);
