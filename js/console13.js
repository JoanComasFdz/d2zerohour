var console1Pair = ''
var console3Pair = ''

var console1LeftValue = ''
var console1RightValue = ''

var console3LeftValue = ''
var console3RightValue = ''

const dataForConsoles1And3 = parseCSVForConsole1And(3)

// DEFINE CLICK HANDLERS

function wheel1Clicked() 
{
  findTerminalForWheel1(dataForConsoles1And3, console1LeftValue, true)
}

function wheel2Clicked() {
  // Clear third wheel
  for (let i = 1; i <= 12; i++) {
    $('#console13 #c3w3li'+i).addClass("overlay")
  }
  $('#console13 #wheel3 #cn-wrapper a').removeClass('active');
  console3LeftValue  = ''
  $('#console13 #wheel3 #cn-button').html(console3LeftValue );
  $('#console13 #console3PairResult span').html('-');

  result()
}

function wheel3Clicked() {
  result()
}

function c1w1ClickHandler(event) {
  event.preventDefault();
  console1LeftValue = $(this).attr("data-number");
  $('#console13 #wheel1 #cn-button').html(console1LeftValue);

  $('#console13 #wheel1 #cn-wrapper a').removeClass('active');
  $(this).addClass('active');  

  // Clear temrinal
  $('#console13 #nodeToActivateValue').html('Nope');
  var nodeToActivate = $('#console13 #nodeToActivateValue');
  $('#console13 #nodeToActivateValue').css('color', 'gray');
  
  wheel1Clicked();
}

function c1w2ClickHandler(event) {
  event.preventDefault();
  console1RightValue = $(this).attr("data-number");
  $('#console13 #wheel2 #cn-button').html(console1RightValue);
  //
  $('#console13 #wheel2 #cn-wrapper a').removeClass('active');
  $(this).addClass('active');  
  
  wheel2Clicked();
}

function c3w3ClickHandler(event) {
  event.preventDefault();
  console3LeftValue = $(this).attr("data-number");
  console.info(`console 2 wheel3 value ${console3LeftValue}`)
  $('#console13 #wheel3 #cn-button').html(console3LeftValue);
  //
  $('#console13 #wheel3 #cn-wrapper a').removeClass('active');
  $(this).addClass('active');
  
  wheel3Clicked();
}

// SET CLICK HANDLERS

$('#console13 #wheel1 #cn-wrapper a').click(c1w1ClickHandler);  

$('#console13 #wheel2 #cn-wrapper a').click(c1w2ClickHandler);

$('#console13 #wheel3 #cn-wrapper a').click(c3w3ClickHandler);

// TERMINAL CALCULATION

function result() {
  console1Pair =  console1LeftValue + '-' + console1RightValue
  console.info(`Console1Pair = ${console1Pair}`)
  $('#console13 #console1PairResult span').html(console1Pair);  

  if (!dataForConsoles1And3[console1Pair]) {
    console.info("Console 1 pair NOT found ;(")
    $('#console13 #nodeToActivateValue').html('Nope');
    var nodeToActivate = $('#console13 nodeToActivateValue');
    nodeToActivate.style.color = 'gray';

    // Nothing found, no need to continue
    return
  }

  console.info(`Console 1 pair found!: ${JSON.stringify(dataForConsoles1And3[console1Pair])}`)

  const console1PairKeys = Object.keys(dataForConsoles1And3[console1Pair])

  // Clear third wheel since wheel 1 and wheel 2 have been clicked.
  for (let i = 1; i <= 12; i++) {
    $('#console13 #c3w3li'+i).addClass("overlay")
  }

  // Activate in wheel 2 only the items beloning to console 1
  for (let i = 0; i < console1PairKeys.length; i++) {
    const element = console1PairKeys[i];
    console.info(`Analyzing element ${JSON.stringify(element)}...`)
    const leftValue = element.split('-')[0]
    // ACTIVATE POSSIBLE VALUE ON CONSOLE 1 RIGHT WHEEL
    $('#console13 #c3w3li'+leftValue).removeClass("overlay")
    console.info(`Activated ${leftValue}`)
  }

  if(console1PairKeys.length == 1)
  {
    // Only one possibility found under console1Pair, so no need to search further,
    // just use that one.
    const key = console1PairKeys[0]
    const element = dataForConsoles1And3[console1Pair][key]
    console.info(`There is only one possible combo, so lets print this: ${JSON.stringify(element)}`)
    $('#console13 #nodeToActivateValue').html(element);
    color = element.split(' ')[0];
    var nodeToActivate = $('#console13 #nodeToActivateValue');
    nodeToActivate.css('color', color);

    console3LeftValue = key.split('-')[0]
    $('#console13 #wheel3 #cn-button').html(console3LeftValue);
    $('#console13 #console3PairResult span').html(key);
    console1Pair = ''

    console.info(`Console 1 Pair has only one combo, select it automatically: ${JSON.stringify(element)}`)

    return
  }

  console.info(`Console 1 has more that 1 combo.`)
  // Console 1 has more than 1 combos.

  console3Pair =  console3LeftValue   + '-' + console3RightValue 
  console.info(`console3Pair = ${console3Pair}`)
  $('#console13 #console3PairResult span').html(console3Pair);

  if (console3Pair.length > 1 && console3Pair.split('-')[0] !== '')  {

    console.info(`Console 3 left value has been clicked, see if there is only one combo with it...`)

    var elementsStartingWithLeftValue = 0
    var lastElementStartingWithLeftValue = ''
    for (let i = 0; i < console1PairKeys.length; i++) {
      const element = console1PairKeys[i];
      var elementLeftValue = element.split('-')[0]
      console.info(`Analyzing element: ${JSON.stringify(element)}, left value: ${console3LeftValue}...`)
      if (elementLeftValue === console3LeftValue  ) {
        elementsStartingWithLeftValue++
        lastElementStartingWithLeftValue = element
        console.info(`Yes, element: ${JSON.stringify(element)} starts with ${console3LeftValue  }.`)
      }
    }

    if (elementsStartingWithLeftValue === 1) {
      console.info (`There is only 1 combo startgin with ${console3RightValue  }!, select it automatically: ${lastElementStartingWithLeftValue}`)
      console3Pair = lastElementStartingWithLeftValue
      $('#console13 #console3PairResult span').html(console3Pair);
      const element = dataForConsoles1And3[console1Pair][console3Pair]
      console.info (`Element is ${element}`)
      $('#console13 #nodeToActivateValue').html(element);
      color = element.split(' ')[0];
      var nodeToActivate = $('#console13 #nodeToActivateValue');
      $('#console13 #nodeToActivateValue').css('color', color);
      
      return
    }
  }

  console.info(`Console 1 pair exists, has more than one combo, and the console 2 left value has more than one combo...`)

  if (!dataForConsoles1And3[console1Pair]) {

  } else {
    $('#console13 #nodeToActivateValue').html('Ok, select next pair.');
    var nodeToActivate = $('#console13 #nodeToActivateValue');
    $('#console13 #nodeToActivateValue').css('color', 'green'); 

    if(dataForConsoles1And3[console1Pair][console3Pair]) {
      console.info("Console 1 Console 2 pair found!")
      $('#console13 #nodeToActivateValue').html(dataForConsoles1And3[console1Pair][console3Pair]);
      color = dataForConsoles1And3[console1Pair][console3Pair].split(' ')[0];
      var nodeToActivate = $('#console13 #nodeToActivateValue');
      $('#console13 #nodeToActivateValue').css('color', color);
    } else {
      console.info(`Console 1 Console 3 pair NOT found: ${console1Pair} and ${console3Pair}`)
      $('#console13 #nodeToActivateValue').html('Nope');
      var nodeToActivate = $('#console13 #nodeToActivateValue');
      $('#console13 #nodeToActivateValue').css('color', 'gray'); 
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