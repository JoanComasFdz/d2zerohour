console.info(`Using singe: ${singe}`)
var console1Pair = ''
var console3Pair = ''

var console1LeftValue = ''
var console1RightValue = ''

var console2LeftValue = ''
var console2RightValue = ''

const dataForConsoles1And3 = parseCSVForConsole1And(3)

// DEFINE CLICK HANDLERS

function wheel1Clicked() 
{
  findTerminalForWheel1('void', 3, dataForConsoles1And3, console1LeftValue, true)
}

function wheel2Clicked() {
  findTerminalForWheel2('void', 3, dataForConsoles1And3, console1LeftValue, console1RightValue, true)
}

function wheel3Clicked() {
  findTerminalForWheel3('void', 3, dataForConsoles1And3, console1LeftValue, console1RightValue, console2LeftValue, true)
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
  console2LeftValue = $(this).attr("data-number");
  console.info(`console 2 wheel3 value ${console2LeftValue}`)
  $('#console13 #wheel3 #cn-button').html(console2LeftValue);
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