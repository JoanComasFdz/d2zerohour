/*
HTML name changes:

console1PairResult -> firstConsolePairResult
console2PairResult -> secondConsolePairResult
console3PairResult -> secondConsolePairResult

c1w4li             -> w3li              // Wheel 3 list item
wheel4             -> wheel3
*/

function findTerminal(useLeftValue) {
  const positionWhenSpliting = useLeftValue ? 0 :  1
  const wheelNumber = useLeftValue ? 3 : 4
  firstConsolePair =  firstConsoleLeftValue + '-' + firstConsoleRightValue
  console.info(`firstConsolePair = ${firstConsolePair}`)
  $('#firstConsolePairResult span').html(firstConsolePair);  

  if (!data[firstConsolePair]) {
    console.info("Console 1 pair NOT found ;(")
    $('#nodeToActivateValue').html('Nope');
    var nodeToActivate = document.getElementById('nodeToActivateValue');
    nodeToActivate.style.color = 'gray';

    // Nothing found, no need to continue
    return
  }

  console.info(`Console 1 pair found!: ${JSON.stringify(data[firstConsolePair])}`)

  const firstConsolePairKeys = Object.keys(data[firstConsolePair])

  // Clear third wheel since wheel 1 and wheel 2 have been clicked.
  for (let i = 1; i <= 12; i++) {
    $('#w3li'+i).addClass("overlay")
  }

  // Activate in wheel 2 only the items beloning to wheel 1
  for (let i = 0; i < firstConsolePairKeys.length; i++) {
    const element = firstConsolePairKeys[i];
    console.info(`Analyzing element ${JSON.stringify(element)}...`)
    const valueToActivate = element.split('-')[positionWhenSpliting]
    // ACTIVATE POSSIBLE VALUE ON CONSOLE 1 RIGHT WHEEL
    $('#w3li'+valueToActivate).removeClass("overlay")
    console.info(`Activated ${valueToActivate}`)
  }

  if(firstConsolePairKeys.length == 1)
  {
    // Only one possibility found under firstConsolePair, so no need to search further,
    // just use that one.
    const key = firstConsolePairKeys[0]
    const element = data[firstConsolePair][key]
    console.info(`There is only one possible combo, so lets print this: ${JSON.stringify(element)}`)
    $('#nodeToActivateValue').html(element);
    color = element.split(' ')[0];
    var nodeToActivate = document.getElementById('nodeToActivateValue');
    nodeToActivate.style.color = color;

    secondConsoleValueToSelect = key.split('-')[positionWhenSpliting]
    $(`#wheel${wheelNumber} #cn-button`).html(secondConsoleValueToSelect);
    $('#secondConsolePairResult span').html(key);
    firstConsolePair = ''

    console.info(`Console 1 Pair has only one combo and it has been automatically selected: ${JSON.stringify(element)}`)

    return
  }

  console.info(`Console 1 has more that 1 combo.`)
  // Console 1 has more than 1 combos.

  secondConsolePair =  secondConsoleLeftValue + '-' + secondConsoleRightValue 
  console.info(`secondConsolePair = ${secondConsolePair}`)
  $('#secondConsolePairResult span').html(secondConsolePair);

  thirdWheelSelectedValue = secondConsolePair.split('-')[positionWhenSpliting]
  if (secondConsolePair.length > 1 && thirdWheelSelectedValue !== '')  {

    console.info(`Wheel 3 value has been clicked, see if there is only one combo with it...`)

    var elementsMatchingThirdWheelValue = 0
    var lastElementMatchingThirdWheelValue = ''
    for (let i = 0; i < firstConsolePairKeys.length; i++) {
      const element = firstConsolePairKeys[i];
      var elementPotentialMatchingValue = element.split('-')[positionWhenSpliting]
      console.info(`Analyzing element: ${JSON.stringify(element)}, does it match with wheel 3 value ${thirdWheelSelectedValue}?`)
      if (elementPotentialMatchingValue === thirdWheelSelectedValue  ) {
        elementsMatchingThirdWheelValue++
        lastElementMatchingThirdWheelValue = element
        console.info(`Yes, element: ${JSON.stringify(element)} matches ${thirdWheelSelectedValue }.`)
      } else {
        console.info(`No, element: ${JSON.stringify(element)} does not match ${thirdWheelSelectedValue }.`)

      }
    }

    if (elementsMatchingThirdWheelValue === 1) {
      console.info (`There is only 1 combo matching ${thirdWheelSelectedValue }, select it automatically: ${lastElementMatchingThirdWheelValue}`)
      secondConsolePair = lastElementMatchingThirdWheelValue
      $('#secondConsolePairResult span').html(secondConsolePair);
      const terminal = data[firstConsolePair][secondConsolePair]
      console.info (`Terminal is ${terminal}`)
      $('#nodeToActivateValue').html(terminal);
      color = terminal.split(' ')[0];
      var nodeToActivate = document.getElementById('nodeToActivateValue');
      nodeToActivate.style.color = color;
      
      return
    }
  }

  console.info(`Console 1 pair exists, has more than one combo, and the console 2 left value has more than one combo...`)

  if (!data[firstConsolePair]) {
    console.info('ENTERED VERY LAST IF !!!!')
  } else {
    console.info('ENTERED VERY LAST IF ELSE !!!!')
    $('#nodeToActivateValue').html('Ok, select next pair.');
    var nodeToActivate = document.getElementById('nodeToActivateValue');
    nodeToActivate.style.color = 'green'; 

    if(data[firstConsolePair][secondConsolePair]) {
      console.info("Console 1 Console 2 pair found!")
      $('#nodeToActivateValue').html(data[firstConsolePair][secondConsolePair]);
      color = data[firstConsolePair][secondConsolePair].split(' ')[0];
      var nodeToActivate = document.getElementById('nodeToActivateValue');
      nodeToActivate.style.color = color; 
    } else {
      console.info(`Console 1 Console 3 pair NOT found: ${firstConsolePair} and ${secondConsolePair}`)
      $('#nodeToActivateValue').html('Nope');
      var nodeToActivate = document.getElementById('nodeToActivateValue');
      nodeToActivate.style.color = 'gray'; 
    }
  }
}





/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
// EventListener | @jon_neal | //github.com/jonathantneal/EventListener
!window.addEventListener && window.Element && (function () {
    function addToPrototype(name, method) {
        Window.prototype[name] = HTMLDocument.prototype[name] = Element.prototype[name] = method;
    }
 
    var registry = [];
 
    addToPrototype("addEventListener", function (type, listener) {
        var target = this;
 
        registry.unshift({
            __listener: function (event) {
                event.currentTarget = target;
                event.pageX = event.clientX + document.documentElement.scrollLeft;
                event.pageY = event.clientY + document.documentElement.scrollTop;
                event.preventDefault = function () { event.returnValue = false };
                event.relatedTarget = event.fromElement || null;
                event.stopPropagation = function () { event.cancelBubble = true };
                event.relatedTarget = event.fromElement || null;
                event.target = event.srcElement || target;
                event.timeStamp = +new Date;
 
                listener.call(target, event);
            },
            listener: listener,
            target: target,
            type: type
        });
 
        this.attachEvent("on" + type, registry[0].__listener);
    });
 
    addToPrototype("removeEventListener", function (type, listener) {
        for (var index = 0, length = registry.length; index < length; ++index) {
            if (registry[index].target == this && registry[index].type == type && registry[index].listener == listener) {
                return this.detachEvent("on" + type, registry.splice(index, 1)[0].__listener);
            }
        }
    });
 
    addToPrototype("dispatchEvent", function (eventObject) {
        try {
            return this.fireEvent("on" + eventObject.type, eventObject);
        } catch (error) {
            for (var index = 0, length = registry.length; index < length; ++index) {
                if (registry[index].target == this && registry[index].type == eventObject.type) {
                    registry[index].call(this, eventObject);
                }
            }
        }
    });
})();