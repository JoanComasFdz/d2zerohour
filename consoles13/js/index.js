
var firstConsolePair = ''
var secondConsolePair = ''

var firstConsoleLeftValue = ''
var firstConsoleRightValue = ''

var secondConsoleLeftValue = ''
var secondConsoleRightValue = ''

// DEFINE CLICK HANDLERS

function wheel1Clicked() 
{
  // Clear wheels
  for (let i = 1; i <= 12; i++) {
    $('#w2li'+i).addClass("overlay")
    $('#w3li'+i).addClass("overlay")
  }

  $('#wheel2 #cn-wrapper a').removeClass('active');
  $('#wheel3 #cn-wrapper a').removeClass('active');

  firstConsoleRightValue = ''
  secondConsoleLeftValue  = ''

  $('#wheel2 #cn-button').html(firstConsoleRightValue);
  $('#wheel3 #cn-button').html(secondConsoleLeftValue );

  $('#secondConsolePairResult span').html('-');

  const firstConsoleKeys = Object.keys(data)
  for (let i = 0; i < firstConsoleKeys.length; i++) {
    const element = firstConsoleKeys[i];
    console.info(`Analyzing element ${JSON.stringify(element)} for left value ${firstConsoleLeftValue}`)
    if (element.split('-')[0] === firstConsoleLeftValue) {
      // ACTIVATE POSSIBLE VALUE ON CONSOLE 1 RIGHT WHEEL
      console.info(`Found that ${element} starts with ${firstConsoleLeftValue}...`)
      const rightValue = element.split('-')[1]
      $('#w2li'+rightValue).removeClass("overlay")
      console.info(`Activated ${rightValue}`)
    } else {
      console.info(`Found that ${element} does not start with ${firstConsoleLeftValue}  `)
    }
  }

  findTerminal(true)
}

function wheel2Clicked() {
  // Clear third wheel
  for (let i = 1; i <= 12; i++) {
    $('#w3li'+i).addClass("overlay")
  }
  $('#wheel3 #cn-wrapper a').removeClass('active');
  secondConsoleLeftValue  = ''
  $('#wheel3 #cn-button').html(secondConsoleLeftValue );
  $('#secondConsolePairResult span').html('-');

  findTerminal(true)
}

function wheel3Clicked() {
  findTerminal(true)
}

function w1ClickHandler(event) {
  firstConsoleLeftValue = $(this).attr("data-number");
  $('#wheel1 #cn-button').html(firstConsoleLeftValue);

  $('#wheel1 #cn-wrapper a').removeClass('active');
  $(this).addClass('active');  

  // Clear temrinal
  $('#nodeToActivateValue').html('Nope');
  var nodeToActivate = document.getElementById('nodeToActivateValue');
  nodeToActivate.style.color = 'gray';
  
  wheel1Clicked();
}

function w2ClickHandler(event) {
  firstConsoleRightValue = $(this).attr("data-number");
  $('#wheel2 #cn-button').html(firstConsoleRightValue);
  //
  $('#wheel2 #cn-wrapper a').removeClass('active');
  $(this).addClass('active');  
  
  wheel2Clicked();
}

function w3ClickHandler(event) {
  secondConsoleLeftValue = $(this).attr("data-number");
  console.info(`console 2 wheel3 value ${secondConsoleLeftValue}`)
  $('#wheel3 #cn-button').html(secondConsoleLeftValue);
  //
  $('#wheel3 #cn-wrapper a').removeClass('active');
  $(this).addClass('active');
  
  wheel3Clicked();
}

// SET CLICK HANDLERS

$('#wheel1 #cn-wrapper a').click(w1ClickHandler);  

$('#wheel2 #cn-wrapper a').click(w2ClickHandler);

$('#wheel3 #cn-wrapper a').click(w3ClickHandler);





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