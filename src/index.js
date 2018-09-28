import _ from 'lodash';
import $ from 'jquery';

function component() {
//   var element = document.createElement('div');
  var element = $('<div></div>');

  // Lodash, now imported by this script
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.html(_.join(['Hello','webpack'], ' '))
//   return element;
  return element.get(0);
}

document.body.appendChild(component());